from django.contrib.sites.models import Site
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.redirects.models import Redirect
from django.utils.translation import gettext, gettext_lazy as _

from .models import *
from pages.models import * 
from pages.admin import * 

from import_export.admin import ImportExportModelAdmin




User = get_user_model()


class DocumentInline(admin.TabularInline):
    model = Document 
    extra = 0 
    classes = ['collapse',]



class GaoAdmin(admin.AdminSite):
    index_title = 'GAO Admin site'
    site_header = 'GAO Admin site'
    site_title  = 'GAO Admin site'


gao_admin = GaoAdmin(name="gao_admin")


class PostInline(admin.StackedInline):
    model = Post 
    extra = 0


class SliderInline(admin.StackedInline):
    model = Slider.clients.through
    extra = 0

from .resources import * 

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


class TeamAdmin(ImportExportModelAdmin):
    resource_class = TeamResource 
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
    inlines = [
        PostInline
    ]


class ClientAdmin(ImportExportModelAdmin):
    resource_class = ClientResource 
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


class SliderAdmin(ImportExportModelAdmin):
    resource_class = SliderResource 
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


class ContactAdmin(ImportExportModelAdmin):
    resource_class = ContactResource 


class DocumentAdmin(ImportExportModelAdmin):
    resource_class = DocumentResource 


class CustomUserAdmin(UserAdmin, ImportExportModelAdmin):
    resource_class = UserResource
    inlines = [
        # ProfileInline,
        # OrderInline,
        DocumentInline
    ]
    
    fieldsets = (
        (_('Personal info'), {
            'fields': (
                'first_name', 
                'last_name', 
                'email',
                # 'phone_number',
            )
        }),
        (None, {
            'fields': (
                'username', 
                'password'
            )
        }),
        # (_('Permissions'), {
        #     'fields': (
        #         'is_active', 
        #         'is_staff', 
        #         'is_superuser', 
        #         'groups', 
        #         'user_permissions'
        #     ),
        # }),
        # (_('Important dates'), {
        #     'fields': (
        #         'last_login', 
        #         'date_joined',
        #     ),
        # }),
    )
    readonly_fields = [
        # 'username',
        # 'first_name',
        # 'last_name',
        # 'email',
        # 'phone_number',
        # 'last_login',
        # 'date_joined',
    ]
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

    list_display = (
        'id', 
        'username',
        'email',
        'first_name',
        'last_name',
        # 'phone_number',
    )
    list_display_links = [
        'id',
        'email',
        'username',
        'first_name',
        'last_name',
        # 'phone_number',
    ]
    search_fields = [
        'email',
        'username',
        'first_name',
        'last_name',
        # 'phone_number',
    ]


gao_admin.register(User, CustomUserAdmin)
gao_admin.register(Client, ClientAdmin)
gao_admin.register(Team, TeamAdmin)
gao_admin.register(Post, PostAdmin)
gao_admin.register(Slider, SliderAdmin)
gao_admin.register(Site)
gao_admin.register(Redirect)
gao_admin.register(Page, PageAdmin)
gao_admin.register(Contact, ContactAdmin)
gao_admin.register(Document, DocumentAdmin)

admin.site.register(Post, PostAdmin)

