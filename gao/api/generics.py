from rest_framework import generics 
from rest_framework.response import Response
from .serializers import * 
from .paginators import * 
from ..calendar import generate_hangouts_link
import datetime
import calendar
from django.http import JsonResponse
import json 
from datetime import datetime, time 

class UserListView(generics.ListCreateAPIView):
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


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()


class ConsultationListView(generics.ListCreateAPIView):
    pagination_class = CustomPagination
    serializer_class = ConsultationListSerializer
    queryset = Consultation.objects.all()

    def create(self, request, *args, **kwargs):
      response  = {"messages":[], 'documents':[]}
      data      = request.data 
      date      = datetime.strptime(data['date'], '%d.%m.%Y')
      start     = datetime.strptime(data['start'], '%H:%M').time()
      end       = datetime.strptime(data['end'], '%H:%M').time()
      advocat   = User.objects.get(id=data['advocat'])
      client    = User.objects.get(id=data['client'])
      if not advocat.timerange_is_free(date, start, end):
        response['messages'].append({
          'text':'Ця година вже зайнята іншим клієнтом',
          'status':'bad',
        })
      if not client.timerange_is_free(date, start, end):
        response['messages'].append({
          'text':'Ця година вже зайнята іншою консультацією',
          'status':'bad',
        })
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
      print(response.data)
      return response


    def get_queryset(self):
        queryset = super().get_queryset()
        request  = self.request 
        data     = request.query_params
        return queryset


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
        # if date and start and end and advocat and client:
        #     consultations = Consultation.objects.filter(
        #         date      = date, 
        #         start = start, 
        #         end   = end,
        #     )
        #     advocat_consultations = consultations.filter(advocat=advocat)
        #     client_consultations  = consultations.filter(client=client)
        #     # TODO: запхати таку перевірку у Consultation.save()
        #     if client_consultations.exists() and advocat_consultations.exists():
        #         response['messages'].append({
        #             'text':'Ця година вже зайнята іншим клієнтом', 
        #             'status':'bad',
        #         })
        #         response['messages'].append({
        #             'text':'Ця година вже зайнята іншою консультацією', 
        #             'status':'bad',
        #         })
        #         return Response(response)
        #     elif advocat_consultations.exists():
        #         response['messages'].append({
        #             'text':'Ця година вже зайнята іншим клієнтом', 
        #             'status':'bad',
        #         })
        #         return Response(response)
        #     elif client_consultations.exists():
        #         response['messages'].append({
        #             'text':'Ця година вже зайнята іншою консультацією', 
        #             'status':'bad',
        #         })
        #         return Response(response)
        if "mark" in request.data:
            super().update(request, *args, **kwargs)
            response['messages'].append({
                'text':'Консультацію було успішно оцінено',
                'status':'success',
            })
            return Response(response)#.data
        response = super().update(request, *args, **kwargs)
        return response


class ConsultationDocumentListView(generics.ListCreateAPIView):
    serializer_class = ConsultationDocumentListSerializer
    queryset = ConsultationDocument.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request 
        data = request.query_params
        print(data, request)
        return queryset


class ConsultationDocumentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConsultationDocumentDetailSerializer
    queryset = ConsultationDocument.objects.all()


class ConsultationPaymentListView(generics.ListCreateAPIView):
    serializer_class = ConsultationPaymentListSerializer
    queryset = ConsultationPayment.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        request  = self.request 
        data     = request.query_params
        return queryset


class ConsultationPaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConsultationPaymentDetailSerializer
    queryset = ConsultationPayment.objects.all()


class FacultyListView(generics.ListCreateAPIView):
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


class FacultyDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FacultyDetailSerializer
    queryset = Faculty.objects.all()

