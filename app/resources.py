from import_export.resources import ModelResource 
from .models import * 


class PostResource(ModelResource):
    class Meta:
        model = Post 
        exclude = []


class TeamResource(ModelResource):
    class Meta:
        model = Team 
        exclude = []


class ClientResource(ModelResource):
    class Meta:
        model = Client 
        exclude = []


class PostResource(ModelResource):
    class Meta:
        model = Post 
        exclude = []


class SliderResource(ModelResource):
    class Meta:
        model = Slider 
        exclude = []


class ContactResource(ModelResource):
    class Meta:
        model = Contact 
        exclude = []


class DocumentResource(ModelResource):
    class Meta:
        model = Document 
        exclude = []

from django.contrib.auth import get_user_model


class UserResource(ModelResource):
    class Meta:
        model = get_user_model() 
        exclude = []

