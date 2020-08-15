from django import apps 
from .settings import sw_blog_app_name
from django.utils.translation import gettext_lazy as _


class BlogConfig(apps.AppConfig):
    name = sw_blog_app_name
    verbose_name = _('Блог')
    

default_app_config = f'{sw_blog_app_name}.BlogConfig'

