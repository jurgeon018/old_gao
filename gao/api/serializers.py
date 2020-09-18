from rest_framework import serializers
from ..models import * 

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        exclude = ['password', 'groups', 'user_permissions', ]


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        exclude = ['password', 'groups', 'user_permissions', ]
        
class AdvocateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'groups', 'user_permissions',]


class ConsultationDocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationDocument 
        exclude = []


class ConsultationDocumentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationDocument 
        exclude = []


class ConsultationPaymentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationPayment 
        exclude = []


class ConsultationPaymentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationPayment 
        exclude = []


class ConsultationListSerializer(serializers.ModelSerializer):
    # date    = serializers.DateTimeField(format="%d.%m.%Y", input_formats=['%d.%m.%Y',])
    # created = serializers.DateTimeField(format="%d.%m.%Y", read_only=True)
    # updated = serializers.DateTimeField(format="%d.%m.%Y", read_only=True)
    documents = ConsultationDocumentListSerializer(many=True, read_only=True)
    payment   = ConsultationPaymentListSerializer(many=True, read_only=True)
    class Meta:
        model = Consultation 
        exclude = []


class ConsultationDetailSerializer(serializers.ModelSerializer):
    # date    = serializers.DateTimeField(format="%d.%m.%Y", input_formats=['%d.%m.%Y',])
    # created = serializers.DateTimeField(format="%d.%m.%Y", read_only=True)
    # updated = serializers.DateTimeField(format="%d.%m.%Y", read_only=True)
    documents = ConsultationDocumentListSerializer(many=True, read_only=True)
    payment   = ConsultationPaymentListSerializer(many=True, read_only=True)
    class Meta:
        model = Consultation 
        exclude = []


class FacultyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty 
        exclude = []


class FacultyDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty 
        exclude = []
