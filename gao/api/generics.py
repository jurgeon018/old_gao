from rest_framework import generics 
from rest_framework.response import Response
from .serializers import * 
from .paginators import * 

import datetime
import calendar
from django.http import JsonResponse
import json 

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
        # TODO: перевірки через User.timerange_is_free
        # print("request.user", request.user)
        # response  = {"messages":[]}
        # data      = request.data 
        # date      = data['date']
        # start     = data['start']
        # end       = data['end']
        # advocat   = data['advocat']
        # client    = data['client']
        # consultations = Consultation.objects.filter(
        #     date  = date, 
        #     start = start, 
        #     end   = end,
        # )
        # advocat_consultations = consultations.filter(advocat=advocat)
        # client_consultations  = consultations.filter(client=client)
        # if client_consultations.exists() and advocat_consultations.exists():
        #     response['messages'].append({
        #         'text':'Ця година вже зайнята іншим клієнтом', 
        #         'status':'bad',
        #     })
        #     response['messages'].append({
        #         'text':'Ця година вже зайнята іншою консультацією', 
        #         'status':'bad',
        #     })
        #     return Response(response)
        # elif advocat_consultations.exists():
        #     response['messages'].append({
        #         'text':'Ця година вже зайнята іншим клієнтом', 
        #         'status':'bad',
        #     })
        #     return Response(response)
        # elif client_consultations.exists():
        #     response['messages'].append({
        #         'text':'Ця година вже зайнята іншою консультацією', 
        #         'status':'bad',
        #     })
        #     return Response(response)
        response = super().create(request, *args, **kwargs)

        for file in request.FILES:
            document = ConsultationDocument.objects.create(
                consultation=Consultation.objects.get(id=response.data.get('id')),
                file=file,
            )
            if request.user.is_authenticated:
                document.author=request.user 
            else:
                document.author=User.objects.get(id=client)
            document.save()
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

