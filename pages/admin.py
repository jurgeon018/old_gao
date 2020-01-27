from django.contrib import admin
from django.contrib import admin as custom_admin
from pages.models import *
from modeltranslation.admin import *

custom_admin = admin.site


class PageFeatureInline(admin.StackedInline):
    def has_add_permission(self, request, obj=None):
        return False 

    model = PageFeature
    extra = 0
    classes = ['collapse']
    exclude = [
        'code',
    ]
    readonly_fields = [
        'name',
    ]


class PageImageInline(admin.StackedInline):
    def has_add_permission(self, request, obj=None):
        return False 
    model = PageImage 
    extra = 0 
    classes = ['collapse']
    exclude = ['code']
    readonly_fields = [
        'name',
    ]

class PageAdmin(admin.ModelAdmin):
    inlines = [
        PageFeatureInline, 
        PageImageInline,
    ]
    fields = [
        'meta_title',
        'meta_descr',
        'meta_key',
    ]
    list_display_links = [
        "id",
        'meta_title',
        'meta_descr',
        'code',
    ]
    list_display = [
        "id",
        'meta_title',
        'meta_descr',
        'code',
    ]
