from django.db import models
from django.utils import timezone
from django.urls import reverse
from django.utils import timezone 
from django.contrib.auth.models import User, AbstractBaseUser,AbstractUser

from tinymce.models import HTMLField


class TimestampMixin(models.Model):
    created = models.DateTimeField(verbose_name="Створено", auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(verbose_name="Оновлено", auto_now_add=False, auto_now=True)

    class Meta:
        abstract = True 


class ProjectUser(AbstractUser):
  CLIENT_ROLE  = 'client'
  ADVOCAT_ROLE = 'advocat'
  USER_ROLES = [
    (CLIENT_ROLE, "client"),
    (ADVOCAT_ROLE, "advocat"),
  ]
  phone_number = models.CharField(verbose_name="Номер телефону", max_length=255, blank=True, null=True)
  role         = models.CharField(verbose_name="Роль", choices=USER_ROLES, default=CLIENT_ROLE, max_length=255)
  rate         = models.FloatField(verbose_name="Ціна за годину консультації", default=0)
  faculty      = models.ManyToManyField(verbose_name="Галузі права", to="gao.Faculty", blank=True)
  
  def get_free_hours(self, date_from, date_to):
    free_hours = ...
    return free_hours 

  def get_free_dates(self):
    free_dates = ...
    return free_dates

  def get_consultations(self):
    if self.role == ADVOCAT_ROLE:
      consultations = Consultation.objects.filter(advocat=self)
    elif self.role == CLIENT_ROLE:
      consultations =  Consultation.objects.filter(client=self)
    return consultations

  def __str__(self):
    return f"{self.first_name} {self.last_name} ({self.username}, {self.phone_number}, {self.email})"
  
  class Meta:
    verbose_name = ('Користувач')
    verbose_name_plural = ('Користувачі')


class Consultation(TimestampMixin):
    STATUS1 = 'STATUS1'
    STATUS2 = 'STATUS2'
    STATUS3 = 'STATUS3'
    STATUS4 = 'STATUS4'
    STATUSES = (
        (STATUS1, "STATUS1"),
        (STATUS2, "STATUS2"),
        (STATUS3, "STATUS3"),
        (STATUS4, "STATUS4"),
    )
    SKYPE  = 'SKYPE'
    VIBER  = 'VIBER'
    GMEET  = 'GMEET'
    ZOOM   = 'ZOOM'
    MOBILE = 'MOBILE'
    FORMATS = [
        (SKYPE,  "SKYPE"),
        (VIBER,  "VIBER"),
        (GMEET,  "GMEET"),
        (ZOOM,   "ZOOM"),
        (MOBILE, "MOBILE"),
    ]
    format    = models.CharField(verbose_name="Формат", null=True, blank=True, choices=FORMATS, default=SKYPE, max_length=255)
    status    = models.CharField(verbose_name="Статус", null=True, blank=True, choices=STATUSES, default=STATUS1, max_length=255)
    # status    = models.ForeignKey(verbose_name="Статус", to="gao.Status", on_delete=models.SET_NULL, null=True, blank=True)
    # format    = models.ForeignKey(verbose_name="Формат", to="gao.Format", on_delete=models.SET_NULL, null=True, blank=True)
    date      = models.DateField(verbose_name="Дата")
    comment   = models.TextField(verbose_name="Коментар", blank=True, null=True)
    mark      = models.SmallIntegerField(verbose_name="Оцінка", blank=True, null=True)
    advocat   = models.ForeignKey(
        verbose_name="Адвокат", to="gao.ProjectUser", 
        related_name="advocat_consultations",
        on_delete=models.CASCADE,
        # on_delete=models.SET_NULL, blank=True, null=True,
    )
    client    = models.ForeignKey(
        verbose_name="Клієнт", to="gao.ProjectUser", 
        related_name="client_consultations",
        on_delete=models.CASCADE,
        # on_delete=models.SET_NULL, blank=True, null=True,
    )

    @property 
    def times(self):
        times = ConsultationTime.objects.filter(consultation=self)
        return times 

    @property
    def time(self):
        # time = time_to - time_from
        time = 0
        for c_time in self.times:
            time 
        return time 

    @property
    def price(self):
        price = 0
        if self.advocat:
            price = self.advocat.rate * self.time
        return price

    class Meta:
        verbose_name = 'Консультація'
        verbose_name_plural = 'Консультації'

    def __str__(self):
        return f'{self.date}'


class ConsultationTime(models.Model):
    consultation = models.ForeignKey(verbose_name="Консультація", to="gao.Consultation", on_delete=models.CASCADE)
    time_from = models.TimeField(verbose_name="Час від")
    time_to   = models.TimeField(verbose_name="Час до")

    def __str__(self):
        return f'{self.time}'

    class Meta:
        verbose_name = "Година консультації"
        verbose_name_plural = "Години консультації"


class ConsultationDocument(TimestampMixin):
    file = models.FileField(verbose_name="Файл")
    consultation = models.ForeignKey(verbose_name="Консультація", to="gao.Consultation", on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.consultation}'

    class Meta:
        verbose_name = "Документ до консультації"    
        verbose_name_plural = "Документи до консультацій"    


class ConsultationPayment(TimestampMixin):
    consultation = models.OneToOneField(verbose_name="Консультація", to="gao.Consultation", on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.FloatField(verbose_name="Сумма")

    def __str__(self):
        return f'{self.consultation}'

    class Meta:
        verbose_name = "Оплата до консультації"    
        verbose_name_plural = "Оплати до консультацій"    


class Faculty(TimestampMixin):
    name = models.CharField(verbose_name="Назва", max_length=255)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = "Право"


class Team(models.Model):
    meta_title  = models.CharField(max_length=255, blank=True, null=True) 
    meta_descr  = models.TextField(blank=True, null=True)
    alt         = models.CharField(max_length=255, blank=True, null=True)
    full_name   = models.CharField(verbose_name='Ім\'я', max_length=255, blank=True, null=True)
    area        = models.CharField(verbose_name='Галузь',max_length=255, blank=True, null=True)
    description = models.TextField(verbose_name="Опис", blank=True, null=True)
    address     = models.CharField(verbose_name="Адреса", max_length=255, blank=True, null=True)
    email       = models.EmailField(verbose_name='email', blank=True, null=True)
    photo       = models.ImageField(verbose_name="Фото", blank=True, null=True)
    phone       = models.CharField(verbose_name="Номер телефону", max_length=255, blank=True, null=True)
    phone2      = models.CharField(verbose_name="Номер телефону2", max_length=255, blank=True, null=True)
    slug        = models.SlugField(verbose_name="Посилання на сайті", max_length=255, blank=True, null=True)

    class Meta:
        verbose_name='учасник'
        verbose_name_plural='Команда'

    def __str__(self):
        return self.full_name

    def get_absolute_url(self):
        return reverse("member", kwargs={"slug": self.slug})
    

class Client(models.Model):
    title = models.CharField(verbose_name="Назва", max_length=255, blank=True, null=True)
    body  = models.TextField(verbose_name="Опис", blank=True, null=True)
    image = models.ImageField(verbose_name="Зображення", blank=True, null=True)
    alt   = models.CharField(verbose_name="alt", max_length=255, blank=True, null=True)

    class Meta:
        verbose_name='клієнт'
        verbose_name_plural='Клієнти'

    def __str__(self):
        return self.title


class Slider(models.Model):
    slider = models.CharField(verbose_name="Номер слайдера", max_length=255)
    clients = models.ManyToManyField(verbose_name="Клієнти", to="Client", related_name="sliders", blank=True, null=True)

    def __str__(self):
        return self.slider

    class Meta:
        verbose_name='Слайдер'
        verbose_name_plural='Слайдери'


class Contact(models.Model):
    name  = models.TextField(verbose_name='Імя', blank=True, null=True)
    email = models.TextField(verbose_name='Емайл', blank=True, null=True)
    phone = models.TextField(verbose_name='Телефон', blank=True, null=True)

    def __str__(self):
        return f"{self.name}, {self.email}, {self.phone}"

    class Meta:
        verbose_name='Контакт'
        verbose_name_plural='Контакти'


class Document(models.Model):
    user = models.ForeignKey(verbose_name='Користувач', related_name='documents', on_delete=models.SET_NULL, to="gao.ProjectUser", blank=True, null=True)
    file = models.FileField(verbose_name='Файл')
    
    def __str__(self):
        return f'{self.user}: {self.file}'
    
    def document_is_pdf(self):
        return self.file.path.split('.')[-1] == '.pdf'
    
    class Meta:
        verbose_name = 'Документ'
        verbose_name_plural = 'Документ'






# class Post(models.Model):
#     meta_title = models.CharField(max_length=255, blank=True, null=True) 
#     meta_descr = models.TextField(blank=True, null=True)
#     alt        = models.CharField(max_length=255, blank=True, null=True)
#     title      = models.CharField(verbose_name='заголовок',max_length=255, blank=True, null=True)
#     slug       = models.SlugField(verbose_name='Посилання', max_length=255, unique=True)
#     # body       = models.TextField(verbose_name='текст', blank=True, null=True)
#     body       = HTMLField(verbose_name='текст', blank=True, null=True)
#     image      = models.ImageField(verbose_name='зображення', blank=True, null=True)
#     updated    = models.DateTimeField(auto_now_add=False, auto_now=True, blank=True, null=True)
#     created    = models.DateTimeField(default=timezone.now)
#     # created    = models.DateTimeField(auto_now_add=True, auto_now=False, blank=True, null=True)
#     author     = models.ForeignKey(to='Team', related_name="posts", blank=True, null=True, on_delete=models.CASCADE)

#     class Meta:
#         verbose_name='пост'
#         verbose_name_plural='Блог'

#     def __str__(self):
#         return self.title

#     def get_absolute_url(self):
#         return reverse("post", kwargs={"slug": self.slug})



