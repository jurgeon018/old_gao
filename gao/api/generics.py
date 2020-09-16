from rest_framework import generics 
from rest_framework.response import Response
from .serializers import * 
from .paginators import * 

import datetime
import calendar
from django.http import JsonResponse


class UserListView(generics.ListCreateAPIView):
    serializer_class = UserListSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request 
        data = request.query_params
        faculty_ids = data.get('faculty_ids')
        if faculty_ids:
            queryset = queryset.filter(faculties__id__in=faculty_ids)
        print(data, request)
        return queryset


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserDetailSerializer
    queryset = User.objects.all()




class ConsultationListView(generics.ListCreateAPIView):
    pagination_class = CustomPagination
    serializer_class = ConsultationListSerializer
    queryset = Consultation.objects.all()

    def create(self, request, *args, **kwargs):
        response  = {"messages":[]}
        data      = request.data 
        date      = data['date']
        time_from = data['time_from']
        time_to   = data['time_to']
        advocat   = data['advocat']
        client    = data['client']
        consultations = Consultation.objects.filter(
            date      = date, 
            time_from = time_from, 
            time_to   = time_to,
        )
        advocat_consultations = Consultation.objects.filter(advocat=advocat)
        client_consultations  = Consultation.objects.filter(client=client)
        # TODO: запхати таку перевірку у Consultation.save()
        if client_consultations.exists() and advocat_consultations.exists():
            response['messages'].append({
                'text':'Ця година вже зайнята іншим клієнтом', 
                'status':'bad',
            })
            response['messages'].append({
                'text':'Ця година вже зайнята іншою консультацією', 
                'status':'bad',
            })
            return Response(response)
        elif advocat_consultations.exists():
            response['messages'].append({
                'text':'Ця година вже зайнята іншим клієнтом', 
                'status':'bad',
            })
            return Response(response)
        elif client_consultations.exists():
            response['messages'].append({
                'text':'Ця година вже зайнята іншою консультацією', 
                'status':'bad',
            })
            return Response(response)
        response = super().create(request, *args, **kwargs)
        return response

    def get_queryset(self):
        queryset = super().get_queryset()
        request  = self.request 
        data     = request.query_params
        return queryset


class ConsultationDetailView(generics.RetrieveUpdateDestroyAPIView):
    pagination_class = CustomPagination
    serializer_class = ConsultationDetailSerializer
    queryset = Consultation.objects.all()

    def update(self, request, *args, **kwargs):
        response  = {"messages":[]}
        data      = request.data 
        date      = data['date']
        time_from = data['time_from']
        time_to   = data['time_to']
        advocat   = data['advocat']
        client    = data['client']
        consultations = Consultation.objects.filter(
            date      = date, 
            time_from = time_from, 
            time_to   = time_to,
        )
        advocat_consultations = Consultation.objects.filter(advocat=advocat)
        client_consultations  = Consultation.objects.filter(client=client)
        # TODO: запхати таку перевірку у Consultation.save()
        if client_consultations.exists() and advocat_consultations.exists():
            response['messages'].append({
                'text':'Ця година вже зайнята іншим клієнтом', 
                'status':'bad',
            })
            response['messages'].append({
                'text':'Ця година вже зайнята іншою консультацією', 
                'status':'bad',
            })
            return Response(response)
        elif advocat_consultations.exists():
            response['messages'].append({
                'text':'Ця година вже зайнята іншим клієнтом', 
                'status':'bad',
            })
            return Response(response)
        elif client_consultations.exists():
            response['messages'].append({
                'text':'Ця година вже зайнята іншою консультацією', 
                'status':'bad',
            })
            return Response(response)
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
        request = self.request 
        data = request.query_params
        print(data, request)
        return queryset


class ConsultationPaymentDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConsultationPaymentDetailSerializer
    queryset = ConsultationPayment.objects.all()


class FacultyListView(generics.ListCreateAPIView):
    serializer_class = FacultyListSerializer
    queryset = Faculty.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request 
        data = request.query_params
        print(data, request)
        return queryset


class FacultyDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FacultyDetailSerializer
    queryset = Faculty.objects.all()


class AdvocateListView(generics.ListCreateAPIView):
    serializer_class = AdvocateListSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request 
        data = request.query_params
        faculty = data.get('faculty')
        if faculty:
            queryset = queryset.filter(faculties__id__in=[faculty])
        return queryset
