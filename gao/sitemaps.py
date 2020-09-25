from django.contrib.sitemaps import Sitemap 
from django.urls import reverse  

<<<<<<< HEAD:app/sitemaps.py
        
=======
from .models import *


>>>>>>> c728cc7f8af7d462cbfda67c2b17863242fb1bbe:gao/sitemaps.py
class TeamSitemap(Sitemap):
    changefreq = 'weekly' 
    protocol = 'https'
    priority = 1

    def items(self):
        return Team.objects.all()

    def lastmod(self, obj):
        return obj.updated



<<<<<<< HEAD:app/sitemaps.py
class PostSitemap(Sitemap):
    changefreq = 'weekly' 
    protocol = 'https'
    priority = 1

    def items(self):
        return Post.objects.all()
=======
# class PostSitemap(Sitemap):
#     def items(self):
#         return Post.objects.all()
>>>>>>> c728cc7f8af7d462cbfda67c2b17863242fb1bbe:gao/sitemaps.py

    def lastmod(self, obj):
        return obj.updated


class StaticViewSitemap(Sitemap):
    changefreq = 'weekly' 
    protocol = 'https'
    priority = 1

    def items(self):
        return [
            "index",
            "contacts",
            "blog",
            "about",

            "practice-1",
            "practice-2",
            "practice-3",
            "practice-4",
            "practice-5",
            "practice-6",
            "practice-7",
            "practice-8",
        ]
    def location(self, item):
        return reverse(item)




