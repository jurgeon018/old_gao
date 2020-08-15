from import_export.resources import ModelResource 

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

