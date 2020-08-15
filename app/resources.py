from import_export.resources import ModelResource 

from .models import * 

 
class ConsultationResource(ModelResource):
    class Meta:
        model = Consultation
        exclude = []


class FacultyResource(ModelResource):
    class Meta:
        model = Faculty
        exclude = []


class ConsultationDocumentResource(ModelResource):
    class Meta:
        model = ConsultationDocument
        exclude = []


class ConsultationPaymentResource(ModelResource):
    class Meta:
        model = ConsultationPayment
        exclude = []

