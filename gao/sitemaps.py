from django.contrib.sitemaps import Sitemap 
from django.urls import reverse  

from .models import *


class TeamSitemap(Sitemap):
    def items(self):
        return Team.objects.all()


class PostSitemap(Sitemap):
    def items(self):
        return Post.objects.all()


class StaticViewSitemap(Sitemap):
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




