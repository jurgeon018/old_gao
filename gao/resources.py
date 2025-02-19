from import_export.resources import ModelResource 
from .models import * 


class TeamResource(ModelResource):
    class Meta:
        model = Team 
        exclude = []


class ClientResource(ModelResource):
    class Meta:
        model = Client 
        exclude = []


class ContactResource(ModelResource):
    class Meta:
        model = Contact 
        exclude = []


class DocumentResource(ModelResource):
    class Meta:
        model = Document 
        exclude = []


class DocumentResource(ModelResource):
    class Meta:
        model = Document 
        exclude = []


class ConsultationResource(ModelResource):
    class Meta:
        model = Consultation 
        exclude = []


class ConsultationDocumentResource(ModelResource):
    class Meta:
        model = ConsultationDocument 
        exclude = []


class ConsultationPaymentResource(ModelResource):
    class Meta:
        model = ConsultationPayment 
        exclude = []


class FacultyResource(ModelResource):
    class Meta:
        model = Faculty 
        exclude = []


class WeekDayResource(ModelResource):
    class Meta:
        model = WeekDay 
        exclude = []


class UserWeekDayResource(ModelResource):
    class Meta:
        model = UserWeekDay 
        exclude = []


from django.contrib.auth import get_user_model 

class UserResource(ModelResource):
    class Meta:
        model = get_user_model()
        exclude = []

class PostResource(ModelResource):
    class Meta:
        model = Post 
        exclude = []


