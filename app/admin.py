from django.contrib import admin
from .models import *



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


class PostAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title', 
        'slug',
        'image',
        'body',
        'author',
    )
    list_editable = [
        'title',
        'slug',
        'image',
        'body',
    ]
    prepopulated_fields = {
        'slug':('title',)
    }
    list_display_links = [
        'id', 
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
    inlines = [
        PostInline
    ]


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




gao_admin.register(Client, ClientAdmin)
gao_admin.register(Team, TeamAdmin)
gao_admin.register(Post, PostAdmin)
gao_admin.register(Slider, SliderAdmin)
