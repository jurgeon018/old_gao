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
        

class ConsultationDocumentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationDocument 
        exclude = []


class ConsultationDocumentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationDocument 
        exclude = []


class ConsultationPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationPayment 
        exclude = []


class ConsultationListSerializer(serializers.ModelSerializer):
    date      = serializers.DateField(format="%d.%m.%Y", input_formats=['%d.%m.%Y',])
    start     = serializers.TimeField(format="%H:%M", input_formats=['%H:%M',])
    end       = serializers.TimeField(format="%H:%M", input_formats=['%H:%M',])
    created   = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    updated   = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    documents = ConsultationDocumentListSerializer(many=True, read_only=True)
    payment   = ConsultationPaymentSerializer(many=True, read_only=True)
    price     = serializers.SerializerMethodField()
    full_time = serializers.SerializerMethodField()
    # advocat   = UserDetailSerializer()
    # client    = UserDetailSerializer()

    def get_price(self, consultation):
        return consultation.price 

    def get_full_time(self, consultation):
        return consultation.full_time 

    class Meta:
        model = Consultation 
        exclude = []


class ConsultationDetailSerializer(serializers.ModelSerializer):
    date      = serializers.DateField(format="%d.%m.%Y", input_formats=['%d.%m.%Y',])
    start     = serializers.TimeField(format="%H:%M", input_formats=['%H:%M',])
    end       = serializers.TimeField(format="%H:%M", input_formats=['%H:%M',])
    created   = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    updated   = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    documents = ConsultationDocumentListSerializer(many=True, read_only=True)
    payment   = ConsultationPaymentSerializer(many=True, read_only=True)
    price     = serializers.SerializerMethodField()
    # advocat   = UserDetailSerializer()
    # client    = UserDetailSerializer()

    def get_price(self, consultation):
        return consultation.price 

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
