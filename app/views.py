from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404,redirect
from .models import *
from django.core.mail import send_mail,  BadHeaderError
from django.contrib import messages
from pages.models import * 



def index(request):
    page, _ = Page.objects.get_or_create(code='index')
    return render(request, 'index.html', locals())


def blog(request):
    page, _ = Page.objects.get_or_create(code='blog')
    return render(request, 'blog.html', locals())


def post(request, slug):
    post = get_object_or_404(Post, slug=slug)
    page = post 
    return render(request,'post.html', locals())


def contacts(request):
    page, _ = Page.objects.get_or_create(code='contacts')
    return render(request, 'contacts.html', locals())


def practice(request, pk):
    return render(request, f'practices/practise-{pk}.html', locals())


def member(request, slug):
    member = Team.objects.get(slug=slug)
    page = member 
    return render(request, 'member.html', locals())


def about(request):
    page, _ = Page.objects.get_or_create(code='about')
    return render(request, 'about.html', locals())


def form(request):
    name  = request.POST.get('name', '')
    email = request.POST.get('email', '')
    phone = request.POST.get('phone', '')

    return_path = request.META.get('HTTP_REFERER', '/')
    # send_mail(
    #     subject        = 'Заявка на консультацію',
    #     message        = f'Заявка на консультацію від: \n{name} , \nEmail: {email} , \nТелефонний номер: {phone}',
    #     from_email     = 'jurgeon018@gmail.com', 
    #     recipient_list = ['jurgeon018@gmail.com', ], 
    #     fail_silently  = False
    # )
    return JsonResponse({
        "status":"OK",
        
    })
    return redirect(return_path)
