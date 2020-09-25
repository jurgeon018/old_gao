from django import template
from ..models import *


register = template.Library()


@register.simple_tag
def get_client_consultations(client, advocat):
    consultations = Consultation.objects.filter(client=client, advocat=advocat)
    return consultations


