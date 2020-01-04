from django.contrib import admin
from django.urls import path, re_path, include
from app.views import *
from django.conf import settings
from django.conf.urls.static import static
from app.admin import gao_admin

from django.views.generic import TemplateView

from app.sitemaps import *
from django.contrib.sitemaps.views import sitemap 



sitemaps = {
  'posts': PostSitemap,
  'team': TeamSitemap,
  'static':StaticViewSitemap,
}


urlpatterns = [
    path('robots.txt/',        TemplateView.as_view(template_name="robots.txt"), name='robots'),
    path('sitemap.xml/',       sitemap, {'sitemaps':sitemaps}),
    path('tinymce/', include('tinymce.urls')),

    path('admin/', gao_admin.urls),
    path('',                 index,    name='index' ),
    path('contacts/',        contacts, name='contacts'),
    path('blog/',            blog,     name='blog'),
    path('about/',           about,    name='about'),
    path('post/<slug>/',     post,     name='post'),
    path('member/<slug>/',   member,   name='member'),
    path('form/',            form,     name='form'),

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

if settings.DEBUG == True:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    