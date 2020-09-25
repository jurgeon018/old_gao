from django.http import JsonResponse
from django.core.mail import send_mail 
from django.conf import settings 

from rest_framework import generics 
from rest_framework.response import Response
from rest_framework import generics 
from rest_framework.decorators import api_view 
from rest_framework.response import Response

from .serializers import * 
from .paginators import * 
from ..calendar import generate_hangouts_link
from ..models import *

import calendar
import json 

from datetime import date, datetime, time, timezone, timedelta



def sendgrid(request):
  import os
  from sendgrid import SendGridAPIClient
  from sendgrid.helpers.mail import Mail
  html_content = '<strong>and easy to do anywhere, even with Python</strong><br>hello!!!!!!<br>hello!!!!!!<br>hello!!!!!!<br>hello!!!!!!<br>hello!!!!!!<br>hello!!!!!!<br>hello!!!!!!<br>hello!!!!!!'
  subject      = 'Sending with Twilio SendGrid is Fun'
  to_emails    = ['jurgeon018@gmail.com', 'mendela.starway@gmail.com', 'kleikoks.py@gmail.com']
  message      = Mail(
      from_email='sendgrid@starwayua.com',
      to_emails=to_emails,
      subject=subject,
      html_content=html_content,
  )
  API_KEY = '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'
  sg = SendGridAPIClient(API_KEY)
  response = sg.send(message)
  return JsonResponse({
    'ok':'ok',
    'e':'e',
  })








def googlemeet(request):
  hangoutLink = generate_hangouts_link(request)
  return JsonResponse({
    'ok':'ok',
    "hangoutLink":hangoutLink,
  })


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
  query = request.data
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


class ConsultationDocumentListView(generics.ListCreateAPIView):
  pagination_class = CustomPagination
  serializer_class = ConsultationListSerializer
  queryset = Consultation.objects.all()


class ConsultationDocumentDetailView(generics.RetrieveAPIView):
  serializer_class = ConsultationListSerializer
  queryset = Consultation.objects.all()


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
      print(type(statuses))
      print(statuses)
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
    # if not advocat.timerange_is_free(date, start, end) or not client.timerange_is_free(date, start, end):
    if not advocat.timerange_is_free(date, start, end):
      response['messages'].append({
        'text':'Ця година вже зайнята',
        'status':'bad',
      })
      return Response(response)
    response = super().create(request, *args, **kwargs)
    consultation = Consultation.objects.get(id=response.data.get('id'))
    documents = []
    for file in request.FILES.values():
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
    link = None
    if data.get('format') == 'GMEET':
      link = generate_hangouts_link(request)
      response.data['link'] = link
      consultation.link = link
      consultation.save()
    # TODO: перенести сповіщення у функцію оплати
    # TODO: записувати інфу про створену консультацію не в базу, а в сесію, і переносити в базу тільки після оплати 
    if consultation.advocat != consultation.client:
      recipient_list = [
        consultation.advocat.email,
        'jurgeon018@gmail.com',
      ]
      message = f'''
      Створено консультацію №{consultation.id}.
      Імя: {consultation.client.full_name}
      Пошта: {consultation.client.email}
      Дата: {consultation.date}
      Час: {consultation.start} - {consultation.end}
      Галузь: {consultation.faculty.name}
      '''
      if link:
        message += f'Посилання: {link}'
      send_mail(
        subject=f'Створено консультацію №{consultation.id}',
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=recipient_list,
        fail_silently=False,
        # fail_silently=True,
      )
    return response


class ConsultationDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = ConsultationDetailSerializer
  queryset = Consultation.objects.all()

  def delete(self, request, *args, **kwargs):
    consultation = Consultation.objects.get(id=kwargs['pk'])
    
    response = super().delete(request, *args, **kwargs)
    if consultation.advocat != consultation.client:
      recipient_list = []
      recipient_list.append("jurgeon018@gmail.com")
      if consultation.client:
        recipient_list.append(consultation.client.email)
      message = f'''
      Видалено консультацію №{consultation.id}.
      Імя: {consultation.client.full_name}
      Пошта: {consultation.client.email}
      Дата: {consultation.date}
      Час: {consultation.start} - {consultation.end}
      Галузь: {consultation.faculty.name}
      '''
      
      send_mail(
        subject=f'Видалено консультацію №{consultation.id}',
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=recipient_list,
        fail_silently=False,
        # fail_silently=True,
      )
    return response

  def update(self, request, *args, **kwargs):
    response  = {"messages":[]}
    data      = request.data 
    date      = data.get('date')
    start     = data.get('start')
    end       = data.get('end')
    advocat   = data.get('advocat')
    client    = data.get('client')
    consultation = Consultation.objects.get(id=kwargs['pk'])
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
      response = super().update(request, *args, **kwargs)
      response.data['messages'] = []
      response.data['messages'].append({
        'text':'Консультацію було успішно оцінено',
        'status':'success',
      })
      subject = f"Консультація №{consultation.id} була оцінена на '{request.data['mark']}' балів."
      message = f"""
      Консультація №{consultation.id} була оцінена на '{request.data['mark']}' балів.
      """
      recipient_list = []
      recipient_list.append('jurgeon018@gmail.com')
      recipient_list.append(consultation.advocat.email)
      send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list, False)
      return response 
    if 'status' in request.data:
      if request.data['status'] == Consultation.DECLINED and not consultation.can_be_changed():
        response['messages'].append({
          'text':f"Ви не можете відміняти консультацію менш ніж за 3 дня до початку",
          'status':'bad',
        })
        return Response(response)
      else:
        response = super().update(request, *args, **kwargs)
        response.data['messages'] = []
        response.data['messages'].append({
          'text':f"Статус консультації №{consultation.id} було змінено на {Consultation.statuses[request.data['status']]}",
          'status':'success',
        })
        subject = f"Статус консультації №{consultation.id} було змінено на {Consultation.statuses[request.data['status']]}"
        message = f"""
        Статус консультації №{consultation.id} було змінено на {Consultation.statuses[request.data['status']]}
        """
        recipient_list = []
        recipient_list.append('jurgeon018@gmail.com')
        recipient_list.append(consultation.advocat.email)
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, recipient_list, False)
        return response 
    response = super().update(request, *args, **kwargs)
    return response

