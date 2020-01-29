from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404,redirect
from .models import *
from django.core.mail import send_mail,  BadHeaderError
from django.contrib import messages
from pages.models import * 
from django.conf import settings 
from django.views.decorators.csrf import csrf_exempt


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


def test(request):
    from django.core.mail import send_mail
    from django.conf import settings
    posts = Post.objects.all()
    subject = 'Прийшла заявка на консультацію'
    message = 'Прийшла заявка на консультацію'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email_from,]    
    send_mail(
        subject, 
        message, 
        email_from, 
        recipient_list,
    )
    return HttpResponse('sdf')


@csrf_exempt
def form(request):
    name  = request.POST.get('name', '')
    email = request.POST.get('email', '')
    phone = request.POST.get('phone', '')


    Contact.objects.create(
        name=name,
        email=email,
        phone=phone,
    )
    
    email_from = settings.EMAIL_HOST_USER


    recipient_list = [
        email_from,
        'jurgeon018@gmail.com',
    ]    
    send_mail(
        subject        = 'Заявка на консультацію',
        message        = f'Заявка на консультацію від: {name} , \nEmail: {email} , \nТелефонний номер: {phone}',
        from_email     = email_from, 
        recipient_list = recipient_list, 
        fail_silently  = False
    )
    return JsonResponse({
        "status":"OK",

    })


"""
sdf@sdf.sdf22222222222222
"""


