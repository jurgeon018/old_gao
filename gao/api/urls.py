from django.urls import path, include 
from .views import * 
from .generics import * 



urlpatterns = [
    path("get_days_info/", get_days_info),
    path("get_hours_info/", get_hours_info),
    path("get_working_hours_info/", get_working_hours_info),
    path("set_advocate_faculties/", set_advocate_faculties),

    path("users/", UserListView.as_view()),
    path("users/<pk>/", UserDetailView.as_view()),

    path("consultations/", ConsultationListView.as_view()),
    path("consultations/<pk>/", ConsultationDetailView.as_view()),

    path("consultation_documents/", ConsultationDocumentListView.as_view()),
    path("consultation_documents/<pk>/", ConsultationDocumentDetailView.as_view()),

    path("consultation_payments/", ConsultationPaymentListView.as_view()),
    path("consultation_payments/<pk>/", ConsultationPaymentDetailView.as_view()),

    path("faculties/", FacultyListView.as_view()),
    path("faculties/<pk>/", FacultyDetailView.as_view()),

    path('googlemeet/', googlemeet)
]


