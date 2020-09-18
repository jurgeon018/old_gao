from import_export.resources import ModelResource 
from import_export.widgets import DateTimeWidget, TimeWidget
from import_export.fields import Field 


from .models import * 

 
class ConsultationResource(ModelResource):
    class Meta:
        model = Consultation
        exclude = ['created','updated',]


class FacultyResource(ModelResource):
    class Meta:
        model = Faculty
        exclude = ['created','updated',]


class ConsultationDocumentResource(ModelResource):
    class Meta:
        model = ConsultationDocument
        exclude = ['created','updated',]


class ConsultationPaymentResource(ModelResource):
    class Meta:
        model = ConsultationPayment
        exclude = ['created','updated',]


class WeekDayResource(ModelResource):
    class Meta:
        model = WeekDay
        exclude = []


class UserWeekDayResource(ModelResource):
    start = Field(
        attribute='start', 
        column_name='start', 
        widget=TimeWidget('%H:%M:%S'),
    ) 
    end = Field(
        attribute='end', 
        column_name='end', 
        widget=TimeWidget('%H:%M:%S'),
    ) 
    class Meta:
        model = UserWeekDay
        exclude = []

