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
    
    date        = serializers.DateField(format="%d.%m.%Y", input_formats=['%d.%m.%Y',])
    start       = serializers.TimeField(format="%H:%M", input_formats=['%H:%M',])
    end         = serializers.TimeField(format="%H:%M", input_formats=['%H:%M',])
    created     = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    updated     = serializers.DateTimeField(format="%d.%m.%Y %H:%M:%S", read_only=True)
    documents   = ConsultationDocumentListSerializer(many=True, read_only=True)
    payment     = ConsultationPaymentSerializer(many=True, read_only=True)
    price       = serializers.SerializerMethodField()
    full_time   = serializers.SerializerMethodField()
    client_name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    faculty_name = serializers.SerializerMethodField()

    def get_price(self, consultation):
        return consultation.price 

    def get_full_time(self, consultation):
        return consultation.full_time 

    def get_client_name(self, consultation):
        return consultation.client.full_name 

    def get_faculty_name(self, consultation):
        return consultation.faculty.name 

    def get_image(self, consultation):
        if consultation.client and consultation.client.image:
            return consultation.client.image.url 

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
    client_name = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    faculty_name = serializers.SerializerMethodField()

    def get_client_name(self, consultation):
        return consultation.client.full_name 

    def get_price(self, consultation):
        return consultation.price 

    def get_image(self, consultation):
        if consultation.client and consultation.client.image:
            return consultation.client.image.url 

    def get_faculty_name(self, consultation):
        return consultation.faculty.name 

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
        
class ConsultationDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationDocument
        exclude = []