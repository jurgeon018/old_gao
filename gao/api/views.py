from rest_framework import generics 
from .serializers import * 


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
    serializer_class = ConsultationListSerializer
    queryset = Consultation.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        request = self.request 
        data = request.query_params
        print(data, request)
        return queryset


class ConsultationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConsultationDetailSerializer
    queryset = Consultation.objects.all()


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

