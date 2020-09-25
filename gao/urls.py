from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.sitemaps.views import sitemap 

from .views import *
from .sitemaps import *

from sw_blog.sitemaps import PostSitemap

from filebrowser.sites import site 


sitemaps = {
  'posts': PostSitemap,
  'team': TeamSitemap,
  'static':StaticViewSitemap,
}


urlpatterns = [
    path('admin/filebrowser/', site.urls),
    path('robots.txt/',        TemplateView.as_view(template_name="robots.txt"), name='robots'),
    path('sitemap.xml/',       sitemap, {'sitemaps':sitemaps}),
    path('tinymce/', include('tinymce.urls')),
    path('admin/',           admin.site.urls),

    path('api/',             include('gao.api.urls')),
    path('gao_liqpay_callback/', gao_liqpay_callback),
    path('',                 index,    name='index' ),
    path('contacts/',        contacts, name='contacts'),
    path('cabinet/',  cabinet,  name='cabinet'),
    path('payment/',         payment,  name='payment'),
    path('blog/',            blog,     name='blog'),
    path('about/',           about,    name='about'),
    path('post/<slug>/',     post,     name='post'),
    path('member/<slug>/',   member,   name='member'),

    path('form/',            form,     name='form'),

    path('read_document/<id>/', read_document, name='read_document'),

    path('custom_login',        custom_login, name='custom_login'),
    path('custom_logout',       custom_logout, name='custom_logout'),
    path('update_profile/',     update_profile, name='update_profile'),
    path('update_password/',    update_password, name='update_password'),
    

    path('practice/<pk>/',   practice, name='practice'),
    path('practice/1/',   TemplateView.as_view(template_name="practise-1.html"), name='practice-1'),
    path('practice/2/',   TemplateView.as_view(template_name="practise-2.html"), name='practice-2'),
    path('practice/3/',   TemplateView.as_view(template_name="practise-3.html"), name='practice-3'),
    path('practice/4/',   TemplateView.as_view(template_name="practise-4.html"), name='practice-4'),
    path('practice/5/',   TemplateView.as_view(template_name="practise-5.html"), name='practice-5'),
    path('practice/6/',   TemplateView.as_view(template_name="practise-6.html"), name='practice-6'),
    path('practice/7/',   TemplateView.as_view(template_name="practise-7.html"), name='practice-7'),
    path('practice/8/',   TemplateView.as_view(template_name="practise-8.html"), name='practice-8'),
]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

