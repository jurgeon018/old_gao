from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404,redirect
from .models import *
from django.core.mail import send_mail,  BadHeaderError
from django.contrib import messages
from pages.models import * 
from django.conf import settings 



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
    subject = 'Thank you for registering to our site'
    message = ' it  means a world to us '
    email_from = settings.DEFAULT_FROM_EMAIL
    recipient_list = ['jurgeon018@gmail.com',]    

    send_mail( 
        subject, 
        message, 
        email_from, 
        recipient_list 
    )


    # mail = settings.EMAIL_HOST_USER
    # print(mail)
    # send_mail(
    #     subject        = 'Заявка на консультацію',
    #     message        = 'Заявка на консультацію',
    #     from_email     = mail, 
    #     recipient_list = [mail, 'jurgeon018@gmail.com'], 
    #     fail_silently  = False,
    # )

    return HttpResponse('sdf')


def form(request):
    name  = request.POST.get('name', '')
    email = request.POST.get('email', '')
    phone = request.POST.get('phone', '')

    return_path = request.META.get('HTTP_REFERER', '/')
    mail = 'jurgeon018@gmail.com'
    mail = 'office@galpravgroup.com.ua'
    mail = 'admin@galpravgroup.com.ua'

    Contact.objects.create(
        name=name,
        email=email, 
        phone=phone,
    )

    send_mail(
        subject        = 'Заявка на консультацію',
        message        = f'Заявка на консультацію від: \n{name} , \nEmail: {email} , \nТелефонний номер: {phone}',
        from_email     = mail, 
        recipient_list = [mail, 'jurgeon018@gmail.com'], 
        fail_silently  = False
    )

    return redirect(return_path)
