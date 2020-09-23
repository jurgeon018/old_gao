from django.http import JsonResponse

from rest_framework import generics 
from rest_framework.response import Response
from rest_framework import generics 
from rest_framework.decorators import api_view 
from rest_framework.response import Response

from .serializers import * 
from .paginators import * 
from ..calendar import generate_hangouts_link

import calendar
import json 

from datetime import date, datetime, time, timezone, timedelta


@api_view(['GET'])
def get_days_info(request, type=None):
  query   = request.query_params#; print("query: ", query)
  advocat = User.objects.get(id=query['advocat'])
  client  = User.objects.get(id=query['client'])

  # TODO: перевірки по клієнту 
  return Response({
      "days":advocat.get_days_info(int(query['year']), int(query['month'])),
  })


@api_view(['GET'])
def get_hours_info(request):
  query   = request.query_params
  date    = datetime.strptime(query['date'], "%d.%m.%Y")
  advocat = User.objects.get(id=query['advocat'])
  client_id = query.get('client')
  if client_id: 
    client  = User.objects.get(id=client_id)

  # TODO: перевірки по клієнту 
  return Response({
    "hours-info":"Години у які вже є консультаціях",
    "working_hours-info":"Робочі години у адвоката по його графіку",
    "hours":advocat.get_hours_info(date),
    "working_hours":advocat.get_working_hours_info(date),
  })


@api_view(['POST','DELETE'])
def set_advocate_faculties(request):
  data        = request.data
  advocat     = User.objects.get(id=data["advocat_id"])
  faculties   = Faculty.objects.filter(id__in=data["faculty_ids"])
  advocat.faculties.clear()
  advocat.faculties.set(faculties)
  return JsonResponse({'OK':'OK'})


@api_view(['POST'])
def add_document(request):
  # query = request.POST or request.GET
  query = request.data
  # print(request.POST)
  # print(request.GET)
  # print(query)
  user = User.objects.get(id=query['user'])
  documents = []
  for file in request.FILES.values():
    document = Document.objects.create(
      user=user,
      file=file,
    )
    print(document.file.url)
    documents.append({
      "id":document.id,
      # "path":document.file.path,
      "url":document.file.url,
    })
  return JsonResponse({
    'documents':documents,
  })


def googlemeet(request):
  hangoutLink = generate_hangouts_link(request)
  return JsonResponse({
    'ok':'ok',
    "hangoutLink":hangoutLink,
  })


class UserListView(generics.ListAPIView):
    serializer_class = UserListSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset    = super().get_queryset()
        request     = self.request 
        data        = request.query_params
        faculty_ids = json.loads(data.get('faculty_ids', "[]"))
        role        = data.get('role')
        if role:
            queryset = queryset.filter(role=role)
        if faculty_ids:
            queryset = queryset.filter(faculties__id__in=faculty_ids)
        return queryset


class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()


class FacultyListView(generics.ListAPIView):
    serializer_class = FacultyListSerializer
    queryset = Faculty.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        request  = self.request 
        data     = request.query_params
        advocat  = data.get('advocat')
        if advocat:
            ids = User.objects.get(id=advocat).faculties.all().values_list('id', flat=True)
            queryset = queryset.filter(id__in=ids)
        return queryset


class FacultyDetailView(generics.RetrieveAPIView):
    serializer_class = FacultyDetailSerializer
    queryset = Faculty.objects.all()


class ConsultationListView(generics.ListCreateAPIView):
  pagination_class = CustomPagination
  serializer_class = ConsultationListSerializer
  queryset = Consultation.objects.all()

  def get_queryset(self):
      queryset   = super().get_queryset()
      request    = self.request
      query      = request.query_params
      date_from  = query.get('date_from')
      date_to    = query.get('date_to')
      date       = query.get('date') 
      dates      = query.get('dates') 
      statuses   = query.get('statuses') 
      formats    = query.get('formats')
      if date_from:
        queryset = queryset.filter(date_from=date_from)
      if date_to:
        queryset = queryset.filter(date__lte=date_to)
      if date:
        queryset = queryset.filter(date=date)
      if dates:
        queryset = queryset.filter(date__in=dates)
      if statuses:
        queryset = queryset.filter(status__in=statuses)
      if formats:
        queryset = queryset.filter(format__in=formats)
      return queryset 
  
  def create(self, request, *args, **kwargs):
    response  = {"messages":[]}
    data      = request.data 
    print("request.data: ", request.data)
    date      = datetime.strptime(data['date'], '%d.%m.%Y')
    start     = datetime.strptime(data['start'], '%H:%M').time()
    end       = datetime.strptime(data['end'], '%H:%M').time()
    advocat   = User.objects.get(id=data['advocat'])
    client    = User.objects.get(id=data['client'])
    working_hours_range = advocat.get_working_hours_range(date)
    week_day_start = working_hours_range['start']
    week_day_end   = working_hours_range['end']
    if week_day_start and week_day_end:
      if start < week_day_start or end > week_day_end:
        response["messages"].append({
          "text":"Цей час не є робочим.",
          "status":'bad',
        })
        return Response(response)
    else:
      response["messages"].append({
        "text":"Цей день є вихідним.",
        "status":'bad',
      })
      return Response(response)
    if start > end:
      return Response({
        'messages':[
          {
          "text":"Година початку не може бути більшою за годину завершення",
          "status":"bad"
          },
        ]
      })
    if not advocat.timerange_is_free(date, start, end) or not client.timerange_is_free(date, start, end):
      response['messages'].append({
        'text':'Ця година вже зайнята',
        'status':'bad',
      })
      return Response(response)
    response = super().create(request, *args, **kwargs)
    documents = []
    consultation = Consultation.objects.get(id=response.data.get('id'))
    for file in request.FILES:
      document = ConsultationDocument.objects.create(
        consultation=consultation,
        file=file,
      )
      if request.user.is_authenticated:
        document.author=request.user
      else:
        document.author=client
      document.save()
      documents.append(document.id)
    response.data['documents'] = documents
    if data.get('format') == 'GMEET':
      link = generate_hangouts_link(request)
      response.data['link'] = link
      consultation.link = link
      consultation.save()
    return response


class ConsultationDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = ConsultationDetailSerializer
  queryset = Consultation.objects.all()

  def update(self, request, *args, **kwargs):
    response  = {"messages":[]}
    data      = request.data 
    date      = data.get('date')
    start     = data.get('start')
    end       = data.get('end')
    advocat   = data.get('advocat')
    client    = data.get('client')
    if date and start and end:
      date      = datetime.strptime(date, '%d.%m.%Y')
      start     = datetime.strptime(start, '%H:%M').time()
      end       = datetime.strptime(end, '%H:%M').time()
    if client and advocat and date and start and end:
      advocat   = User.objects.get(id=advocat)
      client    = User.objects.get(id=client)
      if not advocat.timerange_is_free(date, start, end) or not client.timerange_is_free(date, start, end):
        response['messages'].append({
          'text':'Ця година вже зайнята',
          'status':'bad',
        })
        return Response(response)
    if "mark" in request.data:
      super().update(request, *args, **kwargs)
      response['messages'].append({
        'text':'Консультацію було успішно оцінено',
        'status':'success',
      })
      return Response(response)
    response = super().update(request, *args, **kwargs)
    return response

