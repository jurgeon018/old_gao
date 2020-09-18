from django.contrib import admin
from django.contrib.redirects.models import Redirect
from django.contrib.sites.models import Site
from django.contrib import admin 
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext, gettext_lazy as _
from django.contrib.auth.forms import (
    ReadOnlyPasswordHashWidget, ReadOnlyPasswordHashField,
    UsernameField, UserCreationForm,
    UserChangeForm, AuthenticationForm,
    PasswordResetForm, SetPasswordForm,
    AdminPasswordChangeForm,
)
from django.utils.translation import gettext, gettext_lazy as _
from django import forms 
from django.contrib import admin 
from django.contrib import admin 
from django.contrib.auth.models import (User, Group,)
from django.contrib.auth.admin import (UserAdmin, GroupAdmin,)


from import_export.admin import ImportExportModelAdmin

from .resources import * 
from .models import *



class ConsultationDocumentInline(admin.StackedInline):
    extra = 0
    model = ConsultationDocument
    classes = ['collapse']

@admin.register(Consultation)
class ConsultationAdmin(ImportExportModelAdmin):
    resource_class = ConsultationResource
    inlines = [
        ConsultationDocumentInline,
    ]
    

@admin.register(ConsultationDocument)
class ConsultationDocumentAdmin(ImportExportModelAdmin):
    resource_class = ConsultationDocumentResource


@admin.register(ConsultationPayment)
class ConsultationPaymentAdmin(ImportExportModelAdmin):
    resource_class = ConsultationPaymentResource


@admin.register(Faculty)
class FacultyAdmin(ImportExportModelAdmin):
    resource_class = FacultyResource
    search_fields = [
        'name',
    ]


class SliderInline(admin.StackedInline):
    model = Slider.clients.through
    extra = 0


class TeamAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'full_name',
        'area', 
        'address',
        'email',
        'photo',
        'phone',
        "slug",
    )
    list_editable = [
        'full_name',
        'area', 
        'address',
        'email',
        'photo',
        'phone',
        "slug",
    ]
    list_display_links = [
        'id',
    ]
    prepopulated_fields = {
        'slug':('full_name',)
    }


class ClientAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title', 
        'body',
        'image'
    )
    list_editable = [
        'title', 
        'body',
        'image'
    ]
    list_display_links = [
        'id',
    ]
    inlines = [
        SliderInline
    ]


class SliderAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return False
    def has_add_permission(self, request):
        count = Slider.objects.all().count()
        if count < 4:
          return True
        return False 

    list_display = (
        'id',
        'slider', 
    )
    list_display_links = [
        'id',
    ]
    readonly_fields = [
        'slider',
    ]
    fields = [
        'slider',
    ]
    inlines = [
        SliderInline
    ]


class ContactAdmin(admin.ModelAdmin):
    pass 


class DocumentInline(admin.TabularInline):
    model = Document 
    extra = 0 
    classes = ['collapse',]


class DocumentAdmin(admin.ModelAdmin):
    pass 


class UserWeekDayInline(admin.TabularInline):
    model = UserWeekDay
    exclude = []
    extra = 0
    classes = ['collapse']
    autocomplete_fields = [
        'week_day',
    ]


@admin.register(UserWeekDay)
class UserWeekDayAdmin(admin.ModelAdmin):
    pass 
   
    # search_fields = [
    #     'week_day__name'
    # ]


@admin.register(WeekDay)
class WeekDayAdmin(admin.ModelAdmin):
    def has_delete_permission(self, request, obj=None):
        return False 
    def has_add_permission(self, request):
        return False 
    search_fields = [
        'name'
    ]


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    inlines = [
        UserWeekDayInline, 
    ]
    fieldsets = (
        (_('Personal info'), {
            'fields': (
                'first_name', 
                'last_name', 
                'full_name',
                'role',
                'faculties',
                'email',
                'phone_number',
                'birth_date',
                'sex',
            )
        }),
        (None, {
            'fields': (
                'username', 
                'password'
            )
        }),
        (_('Permissions'), {
            'fields': (
                'is_active', 
                'is_staff', 
                'is_superuser', 
                'groups', 
                'user_permissions'
            ),
            'classes':['collapse']
        }),
        # (_('Important dates'), {
        #     'fields': (
        #         'last_login', 
        #         'date_joined',
        #     ),
        # }),
    )
    add_fieldsets = (
        (None, {
            'classes': (
                'wide',
            ),
            'fields': (
                'username', 
                'password1', 
                'password2'
            ),
        }),
    )
    list_per_page = 100
    save_as_continue = False 
    save_on_top = True 
    # filter_horizontal = ["faculties"]
    autocomplete_fields = [
        'faculties'
    ]
    list_display = (
        'id', 
        'username',
        'email',
        'first_name',
        'last_name',
        'phone_number',
    )
    list_display_links = [
        'id',
        'email',
        'username',
        'first_name',
        'last_name',
        'phone_number',
    ]
    search_fields = [
        'email',
        'username',
        'first_name',
        'last_name',
        'phone_number',
    ]


# @admin.register(WorkingDay)
class WorkingDayAdmin(admin.ModelAdmin):
		exclude = []


admin.site.register(Client, ClientAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Slider, SliderAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Document, DocumentAdmin)
