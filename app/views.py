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

from django.contrib.auth.decorators import login_required


@login_required
def profile(request):
    return render(request, 'profile.html', locals())

def cabinet(request, role):
    return render(request, f'cabinet_{role}.html', locals())


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
        # email_from,
        # 'jurgeon018@gmail.com',
        'office@galpravgroup.com.ua',
    ]
    send_mail(
        subject        = 'Заявка на консультацію',
        message        = f'Заявка на консультацію від: {name} , \nEmail: {email} , \nТелефонний номер: {phone}',
        from_email     = email_from, 
        recipient_list = recipient_list, 
        fail_silently  = True
    )
    return JsonResponse({
        "status":"OK",
    })



from django.contrib.auth import get_user_model 
from django.http import JsonResponse, JsonResponse 
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.contrib.auth import (authenticate, get_user_model, login, logout)
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.urls import reverse 
from django.contrib import messages 

User = get_user_model()


@csrf_exempt 
def custom_logout(request):
    response = redirect(request.META.get('HTTP_REFERER', '/'))
    logout(request)
    if request.is_ajax():
    # if True:
        response = JsonResponse({
            'status':'OK',
            'message':'Ви вийшли',
            'is_authenticated':request.user.is_authenticated,
            'url':reverse('index')
        })
    return response


def read_document(request, id):
    document = Document.objects.get(id=id)
    from django.conf import settings 
    from django.http import FileResponse
    # path = os.path.join(settings.STATICFILES_DIRS[0], 'pdf', 'oferta.pdf')
    path = document.file.path
    if document.is_pdf():
        print(path)
        response = FileResponse(open(path, 'rb'), content_type='application/pdf')
    else:
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        response['Content-Disposition'] = 'attachment; filename=download.docx'
    return response

@csrf_exempt 
def update_profile(request):
    query = request.POST or request.GET
    first_name  = query.get('first_name')
    email = query.get('email') 
    phone_number = query.get('phone_number') 

    user              = request.user
    user.first_name         = first_name 
    user.email        = email 
    user.phone_number = phone_number
    user.save()
    return JsonResponse({
        'status':"OK",
    })


@csrf_exempt 
def update_password(request):
    query = request.POST or request.GET
    old_password  = query.get('old_password')
    password1     = query.get('password1')
    password2     = query.get('password2')
    user = request.user
    if not user.check_password(old_password):
        print('wrond')
        return JsonResponse({
            'message':'Неправильний пароль',
            'status':'BAD',
        })
    if password1 != password2:
        print('passw')
        return JsonResponse({
            'message':'Паролі не співпадають',
            'status':'BAD',
        })
    print(password1)
    user.set_password(password1)
    user.save()
    return JsonResponse({
        'status':"OK",
    })


@csrf_exempt 
def custom_login(request):

    response    = redirect(request.META['HTTP_REFERER'])
    username    = request.POST['username']
    password    = request.POST['password']
    remember_me = request.GET.get('remember_me')

    if remember_me == "true":
        pass
    else:
        request.session.set_expiry(0)
    
    user = User.objects.filter(
        Q(username__iexact=username)|
        Q(email__iexact=username)
    ).distinct() 

    if not user.exists() and user.count() != 1:
        message = 'Такого користувача не існує'
        print(message)
        # if request.is_ajax():
        if True:
            response = JsonResponse({
                'message':message,
                'status':'BAD',
            })
        messages.success(request, message)
        return response

    user = user.first() 

    if not user.check_password(password):
        return JsonResponse({
            'message':'Неправильний пароль',
            'status':'BAD',
        })

    if not user.is_active:
        message = 'Цей користувач неактивний'
        print(message)
        # if request.is_ajax():
        if True:
            response = JsonResponse({
                'message':message,
                'status':'BAD',
            })
        messages.success(request, message)
        return response

    user = authenticate(username=user.username, password=password)

    # if user is not None:
    #     if user.is_active:
    #         login(request, user)
    #         return JsonResponse('fine')
    #     else:
    #         return JsonResponse('inactive')
    # else:
    #     return JsonResponse('bad')

    login(request, user)

    message = 'Ви увійшли'
    print(message)
    # if request.is_ajax():
    if True:
        response = JsonResponse({
            'status':'OK',
            'message':message,
            'is_authenticated':request.user.is_authenticated,
            # 'url':reverse('index'),
            'url':reverse('profile'),
        })
    messages.success(request, message)
    return response




