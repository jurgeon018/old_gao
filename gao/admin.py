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
    autocomplete_fields = [
        'consultation',
    ]

class ConsultationPaymentInline(admin.StackedInline):
    extra = 0
    model = ConsultationPayment
    # classes = ['collapse']
    autocomplete_fields = [
        'consultation',
    ]


@admin.register(Consultation)
class ConsultationAdmin(ImportExportModelAdmin):
    list_filter = [
        # 'advocat',
        'date',
        'format',
        'status',
    ]
    list_display = [
        'id',
        'date',
        'start',
        'end',
        'advocat',
        'client',
        'faculty',
    ]
    autocomplete_fields = [
        'advocat',
        'client',
        'faculty',
    ]
    search_fields = [
        'advocat__full_name',
        'faculty__name',
    ]
    resource_class = ConsultationResource
    inlines = [
        ConsultationDocumentInline,
        ConsultationPaymentInline,
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


class UserWorkingDayInline(admin.TabularInline):
    model = UserWorkingDay
    exclude = []
    extra = 0
    classes = ['collapse']
    autocomplete_fields = [
        # 'week_day',
    ]


@admin.register(UserWeekDay)
class UserWeekDayAdmin(admin.ModelAdmin):
    pass 
   

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
        UserWorkingDayInline,
        DocumentInline,
        ConsultationDocumentInline,
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


class PostAdmin(ImportExportModelAdmin):
    resource_class = PostResource 
    list_display = (
        'id',
        'title', 
        'slug',
        'image',
        'author',
    )

    prepopulated_fields = {
        'slug':('title',)
    }
    list_display_links =list_display


admin.site.register(Post, PostAdmin)
admin.site.register(Client, ClientAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Document, DocumentAdmin)
