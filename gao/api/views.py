from rest_framework import generics 
from .serializers import * 
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

# BO API
def advocat_busy_days(request):
    advocat_id = request.GET.get('advocat_id')
    month = request.GET.get('month')
    year = request.GET.get('year')
    advocat = User.objects.get(id=advocat_id)
    special_days = WorkingDay.objects.filter(advocat=advocat)
    days_available = []
    month_range = range(1, calendar.monthrange(year=int(year), month=int(month))[-1] + 1)
    for i in month_range:
        day = datetime.date(day=i, month=int(month), year=int(year))
        if special_days.filter(date=day):
            days_available.append(day.strftime('%d-%B-%Y'))
            continue
        if day.weekday() == 0 and not advocat.monday : 
            continue
        if day.weekday() == 1 and not advocat.tuesday : 
            continue
        if day.weekday() == 2 and not advocat.wednesday : 
            continue
        if day.weekday() == 3 and not advocat.thursday : 
            continue
        if day.weekday() == 4 and not advocat.friday : 
            continue
        if day.weekday() == 5 and not advocat.saturday : 
            continue
        if day.weekday() == 6 and not advocat.sunday : 
            continue
        else:
            days_available.append(day.strftime('%d-%B-%Y'))
    return JsonResponse({"OK": days_available})

def delete_advocate_faculty(request):
    data = request.data
    advocat_id  = data.get("advocat_id")
    faculty_id  = data.get("faculty_id")
    advocat = User.objects.get(id=advocat_id)
    faculty = Faculty.objects.get(id=faculty_id)
    advocat.faculties.Remove(faculty)
    return JsonResponse({"OK": "OK"})

def add_advocate_faculty(request):
    data = request.data
    advocat_id  = data.get("advocat_id")
    faculty_id  = data.get("faculty_id")
    advocat = User.objects.get(id=advocat_id)
    faculty = Faculty.objects.get(id=faculty_id)
    advocat.faculties.add(faculty)
    return JsonResponse({"OK": "OK"})

def add_advocate_document(request):
    data = request.data
    file = request.Files['file']
    advocat_id  = data.get("advocat_id")
    advocat = User.objects.get(id=advocat_id)
    documents = Document.objects.create(user=advocat, file=file)
    return JsonResponse({"OK": "OK"})

def user_create_consultation(request):
    data = request.data
    user = data.get('user')
    faculty = data.get('faculty')
    advocat = data.get('advocat')
    date    = data.get('date')
    
    return