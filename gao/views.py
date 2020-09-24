from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404,redirect
from django.core.mail import send_mail,  BadHeaderError
from django.contrib import messages
from django.conf import settings 
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from box.core.sw_content.models import * 

from sw_blog.models import Post 

from .models import *

from datetime import datetime, date, time, timedelta 


@login_required
def cabinet(request):
  users = User.objects.filter(role=User.CLIENT_ROLE)
  user = request.user
  role = user.role
  faculties = Faculty.objects.all()
  advocats = User.objects.filter(role=User.ADVOCAT_ROLE)
  clients  = User.objects.filter(role=User.CLIENT_ROLE)
  consultations = Consultation.objects.all()
  now = datetime.now()
  hours_list = []
  for hours in range(9, 20):
      hours_list.append(f'{hours}.00')
      if hours != 19:
          hours_list.append(f'{hours}.30')
  today = datetime.today()
  dates = []
  for days in range(0, 10):
      dates.append(today + timedelta(days=days))
  if role == User.ADVOCAT_ROLE:
      consultations = consultations.filter(advocat=user).order_by('date')
      clients = User.objects.filter(id__in=consultations.values_list('client__id', flat=True))
  elif role == User.CLIENT_ROLE:
      consultations = consultations.filter(client=user)
      advocats = User.objects.filter(id__in=consultations.values_list('advocat__id', flat=True))
  finished_consultations = consultations.filter(status=Consultation.FINISHED)
  return render(request, f'booking/cabinet_{role}.html', locals())

def index(request):
    page, _ = Page.objects.get_or_create(code='index')
    page_is_index = True 
    return render(request, 'index.html', locals())

def blog(request):
    page, _ = Page.objects.get_or_create(code='blog')
    return render(request, 'blog.html', locals())

from sw_liqpay.utils import get_liqpay_context, create_liqpay_transaction
from sw_liqpay.models import LiqpayConfig

def get_gao_liqpay_context(request):
    # TODO: а)поставити обмеження на створення нової консультації, якщо є неоплачена стара 
    # TODO: б)діставати консультацію з сесії 
    consultation = Consultation.objects.get(
        client=request.user,
        status=Consultation.UNORDERED,
    )
    liqpay_params = {
        'amount': consultation.price,
        'description': str(consultation.comment),
        'order_id': consultation.id,
        'action': 'pay',
        'currency': 'UAH',
        'version': '3',
        'sandbox': int(LiqpayConfig.get_solo().sandbox_mode), 
        'server_url': f'/gao/liqpay_callback/',
    }
    signature, data = get_liqpay_context(liqpay_params)
    context = {
        'signature': signature,
        'data': data,
        'callback_url':'/gao_liqpay_callback/',
    }
    return context

def payment(request):
    context = get_gao_liqpay_context(request)
    return render(request, 'payment.html', context)

def gao_liqpay_callback(request):
    form          = create_liqpay_transaction(request)
    transaction   = form.instance 
    consultation  = Consultation.objects.get(id=transaction.order_id)
    payment       = ConsultationPayment.objects.create(
        consultation=consultation,
        amount=transaction.amount,
    )
    print('YES BLYAT!')
    # TODO: 
    # send_mail()
    # consultation.status = Consultation.FINISHED 
    # consultation.save()
    return JsonResponse({})

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
    # if document.is_pdf:
    if document.is_pdf:
        response = FileResponse(open(path, 'rb'), content_type='application/pdf')
    elif document.is_jpg:
        response = FileResponse(open(path, 'rb'), content_type='image/jpg')
    elif document.is_jpeg:
        response = FileResponse(open(path, 'rb'), content_type='image/jpeg')
    elif document.is_png:
        response = FileResponse(open(path, 'rb'), content_type='image/png')
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
    user.first_name   = first_name 
    user.email        = email 
    user.phone_number = phone_number
    user.save()
    return JsonResponse({
        'status':"OK",
    })


from django.contrib.auth import update_session_auth_hash


@csrf_exempt 
def update_password(request):
    query = request.POST or request.GET
    old_password  = query.get('old_password')
    password1     = query.get('password1')
    password2     = query.get('password2')
    user = request.user
    if not user.check_password(old_password):
        return JsonResponse({
            'message':'Неправильний пароль',
            'status':'BAD',
        })
    if password1 != password2:
        return JsonResponse({
            'message':'Паролі не співпадають',
            'status':'BAD',
        })
    print(password1)
    user.set_password(password1)
    update_session_auth_hash(request, user)
    user.save()
    return JsonResponse({
        'status':"OK",
    })


@csrf_exempt 
def custom_login(request):
    query = request.POST or request.GET
    response    = redirect(request.META['HTTP_REFERER'])
    username    = query['username']
    password    = query['password']
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
    login(request, user)
    message = 'Ви увійшли'
    print(message)
    response = JsonResponse({
        'status':'OK',
        'message':message,
        'is_authenticated':request.user.is_authenticated,
        'url':reverse('cabinet'),
    })
    messages.success(request, message)
    return response




