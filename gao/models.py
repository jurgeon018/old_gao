from django.db import models
from django.db.models import Q
from django.utils import timezone
from django.urls import reverse
from django.utils import timezone 
from django.contrib.auth.models import User, AbstractBaseUser, AbstractUser
from django.core.exceptions import ValidationError

from calendar import monthrange
from datetime import datetime, date, time, timedelta


# users area 


class User(AbstractUser):
  CLIENT_ROLE  = 'client'
  ADVOCAT_ROLE = 'advocat'
  USER_ROLES = [
    (CLIENT_ROLE, "client"),
    (ADVOCAT_ROLE, "advocat"),
  ]
  image        = models.ImageField(verbose_name="Зображення", blank=True, null=True)
  full_name    = models.CharField(
      verbose_name="Повне ім'я", max_length=150, blank=False, null=False,
  )
  birth_date   = models.DateField(
      verbose_name="Дата народження", blank=True, null=True,
  )
  sex          = models.CharField(
      verbose_name="Стать", max_length=50, blank=True, null=True,
  )
  phone_number = models.CharField(
      verbose_name="Номер телефону", max_length=255, blank=True, null=True,
  )
  role         = models.CharField(
      verbose_name="Роль", choices=USER_ROLES, default=CLIENT_ROLE, max_length=255,
  )
  rate         = models.FloatField(
      verbose_name="Ціна за годину консультації", default=0,
  )
  faculties    = models.ManyToManyField(
      verbose_name="Галузі права", to="gao.Faculty", blank=True, related_name="advocats",
  )

  def get_days_info(self, year, month):
    days = []
    for i in range(1, monthrange(year, month)[-1]+1):
      day = date(year, month, i)
      days.append({
        "day":day, 
        "status":self.get_day_status(day),
      })
    return days

  def get_day_status(self, day):
    '''
    Статуси: 
    rest        - зайнятий, без консультацій
    blocked     - зайнятий, з консультаціями 
    free        - вільний, без консультацій
    partly_busy - вільний, з консультаціями 
    unknown     - помилка в логіці перевірок
    '''
    week_days = UserWeekDay.objects.filter(user=self)
    week_day_codes = week_days.values_list('week_day__code', flat=True)
    if str(day.isoweekday()) not in week_day_codes:
      return 'rest'
    else:
      statuses = [hour['is_free'] for hour in self.get_working_hours_info(day)]
      if True not in statuses:
        return 'blocked'
      elif False not in statuses:
        return 'free'
      elif True in statuses and False in statuses:
        return 'partly_busy'

  def get_week_day(self, date):
    """
    Получає:
    date - date-об'єкт
    Повертає:
    week_day - статичний день тижня 
    """
    week_day = UserWeekDay.objects.filter(
      user=self, 
      week_day__code=date.isoweekday(),
    ).first()
    return week_day
  
  def get_working_day(self, date):
    """
    Получає:
    date - date-об'єкт
    Повертає:
    working_day - динамічний робочий день тижня 
    """
    working_day = UserWorkingDay.objects.filter(
      advocat=self, 
      date=date,
    ).first()
    return working_day

  def get_working_hours_range(self, date):
    '''
    Получає:
    date - date-об'єкт.
    Повертає:
    week_day - день тижня
    start - початок дня тижня
    end - закінчення дня тижня
    '''
    working_day = self.get_working_day(date)
    week_day = self.get_week_day(date)
    if working_day:
      start    = working_day.start
      end      = working_day.end
      # week_day = working_day
    elif week_day:
      start    = week_day.start
      end      = week_day.end
      # week_day = week_day
    else:
      start    = None
      end      = None
    return {
      'start':start,
      "end":end,
      # "week_day":week_day,
    }

  def get_hours_info(self, date):
    """
    Повертає години які є у консультаціях
    """
    consultations = Consultation.objects.filter(
      date=date,
      advocat=self,
    )
    hours = []
    for consultation in consultations:
      hours.append({
        "consultation_id": consultation.id,
        "start": time.strftime(consultation.start, "%H:%M"),
        "end": time.strftime(consultation.end, "%H:%M"),
      })
    return hours

  def get_working_hours_info(self, date):
    """
    Генерує години з інтервалами з робочого діапазону годин 
    """
    working_hours_range = self.get_working_hours_range(date)
    print("get_working_hours_range", working_hours_range)
    start = working_hours_range['start']
    end   = working_hours_range['end']
    if not start or not end:
      return []
    hours = []
    start = time.strftime(start, '%H:%M')
    end   = time.strftime(end, '%H:%M')
    if start.endswith(':30'):
      start = start.split(':')[0]
      start = int(start)+1
    else:
      start = start.split(':')[0]
    if end.endswith(':30'):
      end = end.split(':')[0]
      end = int(end) + 1 
    else:
      end = end.split(':')[0]
    # TODO: протестити правильність 
    raw_hours = list(range(int(start), int(end)+1))
    for raw_hour in raw_hours:
      hour = datetime.strptime(f'{raw_hour}:00', "%H:%M")
      hours.append({
        "hour":datetime.strftime(hour, "%H:%M"),
        'is_free':self.timerange_is_free(date, hour.time(), hour.time()),
      })    
      if raw_hour != raw_hours[-1]:
        hour = datetime.strptime(f"{raw_hour}:30", "%H:%M")
        hours.append({
          "hour":datetime.strftime(hour, "%H:%M"),
          'is_free':self.timerange_is_free(date, hour.time(), hour.time()),
        })      
    return hours

  def timerange_is_free(self, date, start, end):
    consultations = Consultation.objects.filter(date=date)
    if self.role == User.ADVOCAT_ROLE:
      consultations = consultations.filter(advocat=self)
    elif self.role == User.CLIENT_ROLE:
      consultations = consultations.filter(client=self)
    # Обмеження по статичному дню тижня і по динамічному окремому дню
    working_hours_range = self.get_working_hours_range(date)
    week_day_start    = working_hours_range['start']
    week_day_end      = working_hours_range['end']
    if week_day_start and week_day_end:
      if start < week_day_start or end > week_day_end:
        return False
      else:
        pass
    else:
      return False
    # Обмеження по існуючих консультаціях
    consultations = Consultation.get_intersected(consultations, start, end)
    if consultations.exists():
      return False
    return True

  def get_consultations(self):
    if self.role == User.ADVOCAT_ROLE:
      consultations = Consultation.objects.filter(advocat=self)
    elif self.role == User.CLIENT_ROLE:
      consultations =  Consultation.objects.filter(client=self)
    return consultations

  def get_client_consultations(self):
    return Consultation.objects.filter(client=self)

  def __str__(self):
    return f"{self.first_name} {self.last_name} ({self.username}, {self.phone_number}, {self.email})"
  
  class Meta:
    verbose_name = ('Користувач')
    verbose_name_plural = ('Користувачі')


class WeekDay(models.Model):
    mon = 1
    tue = 2
    wed = 3
    thu = 4
    fri = 5
    sat = 6
    sun = 7
    CODE_CHOICES = [
        [mon, "mon"],
        [tue, "tue"],
        [wed, "wed"],
        [thu, "thu"],
        [fri, "fri"],
        [sat, "sat"],
        [sun, "sun"],
    ]
    name = models.CharField(verbose_name="Назва", max_length=255, unique=True)
    code = models.SlugField(verbose_name="Код", max_length=255, unique=True, choices=CODE_CHOICES)

    def __str__(self):
        return f'{self.name}|{self.code}'

    class Meta:
        unique_together     = ['name','code']
        verbose_name        = "День тижня"
        verbose_name_plural = "Дні тижня"


class UserWeekDay(models.Model):
    week_day = models.ForeignKey(verbose_name="День тижня", to="gao.WeekDay", on_delete=models.CASCADE)
    user     = models.ForeignKey(verbose_name="Користувачі", to="gao.User", on_delete=models.CASCADE)
    start    = models.TimeField(verbose_name="Початок робочого дня")
    end      = models.TimeField(verbose_name="Закінчення робочого дня")
    
    def clean(self):
      if self.start > self.end:
        raise ValidationError("Година початку мусить бути меншою за годину закінчення")
      if self.start.minute % 30 !=0:
        raise ValidationError("Година початку мусить бути кратною 30хв")
      if self.end.minute % 30 !=0:
        raise ValidationError("Година закінчення мусить бути кратною 30хв")

    def save(self, *args, **kwargs):
      if self.start > self.end:
        raise ValidationError("Година початку мусить бути меншою за годину закінчення")
      if self.start.minute % 30 !=0:
        raise ValidationError("Година початку мусить бути кратною 30хв")
      if self.end.minute % 30 !=0:
        raise ValidationError("Година закінчення мусить бути кратною 30хв")
      super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.user.username}: {self.week_day}, {self.start}-{self.end}'

    class Meta:
        unique_together = ['week_day','user']
        verbose_name = "День тижня адвоката"
        verbose_name_plural = "Дні тижня адвоката"


class UserWorkingDay(models.Model):
    advocat   = models.ForeignKey(
        verbose_name="Адвокат", to="gao.User",
        on_delete=models.SET_NULL, blank=True, null=True,
    )
    date  = models.DateField(verbose_name="День")
    start = models.TimeField(verbose_name="Початок робочого дня")
    end   = models.TimeField(verbose_name="Завершення робочого дня")

    def clean(self):
      if self.start > self.end:
        raise ValidationError("Година початку мусить бути меншою за годину закінчення")
      if self.start.minute % 30 !=0:
        raise ValidationError("Година початку мусить бути кратною 30хв")
      if self.end.minute % 30 !=0:
        raise ValidationError("Година закінчення мусить бути кратною 30хв") 
    
    def save(self, *args, **kwargs):
      if self.start > self.end:
        raise ValidationError("Година початку більша за годину закінчення")
      if self.start.minute % 30 !=0:
        raise ValidationError("Година початку мусить бути кратною 30хв")
      if self.end.minute % 30 !=0:
        raise ValidationError("Година закінчення мусить бути кратною 30хв") 
      super().save(*args, **kwargs)

    def  __str__(self):
        return f'{self.date}: {self.start} - {self.end}'

    class Meta:
        unique_together = ['date', 'advocat']
        verbose_name = "Робочий день"
        verbose_name_plural = "Робочі дні"


class TimestampMixin(models.Model):
    created = models.DateTimeField(verbose_name="Створено", auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(verbose_name="Оновлено", auto_now_add=False, auto_now=True)

    class Meta:
        abstract = True 


class Faculty(TimestampMixin):
    name = models.CharField(verbose_name="Назва", max_length=255)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = "Галузь права"
        verbose_name_plural = "Галузі права"


# consultations area 


class Consultation(TimestampMixin):
    UNORDERED   = 'UNORDERED'
    DECLINED    = 'DECLINED'
    IN_PROGRESS = 'IN_PROGRESS'
    FINISHED    = 'FINISHED'
    STATUSES = (
      (UNORDERED, "Незавершено"),
      (DECLINED, "Відмовлено"),
      (IN_PROGRESS, "В процессі"),
      (FINISHED, "Завершено"),
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
    link      = models.CharField(verbose_name="Ссилка на гуглмітінг", blank=True, null=True, max_length=255)
    format    = models.CharField(
      verbose_name="Формат", null=False, blank=False, choices=FORMATS, default=SKYPE, max_length=255,
    )
    status    = models.CharField(
      verbose_name="Статус", null=False, blank=False, choices=STATUSES, default=UNORDERED, max_length=255,
    )
    date      = models.DateField(
      verbose_name="Дата",
    )
    faculty   = models.ForeignKey(
      verbose_name="Галузь права", to="gao.Faculty", blank=True, null=True, 
      on_delete=models.SET_NULL, related_name="consulations",
    )
    start = models.TimeField(
      verbose_name="Час початку",
    )
    end = models.TimeField(
      verbose_name="Час завершення",
    )
    comment   = models.TextField(
      verbose_name="Коментар", blank=True, null=True,
    )
    mark      = models.SmallIntegerField(
      verbose_name="Оцінка", blank=True, null=True,
    )
    advocat   = models.ForeignKey(
        verbose_name="Адвокат", to="gao.User", 
        related_name="advocat_consultations",
        on_delete=models.CASCADE, blank=False, null=False,
    )
    client    = models.ForeignKey(
        verbose_name="Клієнт", to="gao.User",
        related_name="client_consultations",
        on_delete=models.SET_NULL, blank=True, null=True,
    )
    
    def clean(self):
      if self.start > self.end:
        raise ValidationError("Година початку мусить бути меншою за годину закінчення")
      if self.start.minute % 30 !=0:
        raise ValidationError("Година початку мусить бути кратною 30хв")
      if self.end.minute % 30 !=0:
        raise ValidationError("Година закінчення мусить бути кратною 30хв")

    def save(self, *args, **kwargs):
      if self.start > self.end:
        raise ValidationError("Година початку більша за годину закінчення")
      if self.start.minute % 30 !=0:
        raise ValidationError("Година початку мусить бути кратною 30хв")
      if self.end.minute % 30 !=0:
        raise ValidationError("Година закінчення мусить бути кратною 30хв") 

      consultations = Consultation.objects.filter(
        advocat=self.advocat,
        client=self.client,
        date=self.date,
      )
      consultations = Consultation.get_intersected(consultations, self.start, self.end)
      if consultations.exists() and consultations.count() == 1 and consultations.first() != self:
        raise Exception('ERROR!!!')
      super().save()

    @classmethod
    def get_intersected(cls, consultations, start, end):
      consultations = consultations.filter(
        # Години консультації між вибраними годинами
        Q(start__lte=start, end__gt=end)|
        # Початок консультації між вибраними годинами
        Q(start__gt=start, start__lt=end)|
        # Закінчення консультації між вибраними годинами
        Q(end__gt=start, end__lt=end)|
        # Вибрані години між годинами консультації
        Q(start__lt=start, start__gt=end)|
        # Вибрані години співпадають з годинами консультації
        Q(start=start, end=end)
      )
      return consultations

    @property
    def full_time(self):
      start   = time.strftime(self.start, "%H:%M:%S")
      end     = time.strftime(self.end, "%H:%M:%S")
      tdelta  = datetime.strptime(end, '%H:%M:%S') - datetime.strptime(start, '%H:%M:%S')
      days    = tdelta.days 
      seconds = tdelta.seconds 
      minutes = (seconds//60)%60
      hours   = seconds // 3600
      return {
        "minutes":minutes,
        "hours":hours,
      }

    @property
    def price(self):
      full_time = self.full_time
      minutes   = full_time['minutes']
      hours     = full_time['hours']
      rate      = self.advocat.rate
      price     = rate * hours 
      price     = price + (minutes/60 * rate)
      return price 

    def get_files_by_user(self):
        consultations = Consultation.objects.filter(client=self.client, advocat=self.advocat)
        return 

    @property
    def documents(self):
      documents = ConsultationDocument.objects.filter(consultation=self)
      return documents

    class Meta:
        verbose_name = 'Консультація'
        verbose_name_plural = 'Консультації'

    def __str__(self):
        res = f'{self.date}, {self.start}-{self.end}, {self.advocat.username}'
        if self.client:
          res += f' -> {self.client.username}'
        return res 


class ConsultationDocument(TimestampMixin):
    file = models.FileField(verbose_name="Файл")
    author = models.ForeignKey(
        verbose_name="Автор", to="gao.User", on_delete=models.SET_NULL, null=True, blank=False,
    )
    consultation = models.ForeignKey(
        verbose_name="Консультація", to="gao.Consultation", on_delete=models.SET_NULL, null=True, blank=False, related_name="documents"
    )

    def __str__(self):
        return f'{self.consultation}'

    class Meta:
        verbose_name = "Документ до консультації"    
        verbose_name_plural = "Документи до консультацій"    


class ConsultationPayment(TimestampMixin):
    consultation = models.OneToOneField(
        verbose_name="Консультація", to="gao.Consultation", on_delete=models.SET_NULL, null=True, blank=False, related_name="payment"
    )
    amount = models.FloatField(verbose_name="Сумма")

    def __str__(self):
        return f'{self.consultation}'

    class Meta:
        verbose_name = "Оплата до консультації"    
        verbose_name_plural = "Оплати до консультацій"    


# old models from november 2019


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
    user = models.ForeignKey(verbose_name='Користувач', related_name='documents', on_delete=models.SET_NULL, to="gao.User", blank=True, null=True)
    file = models.FileField(verbose_name='Файл')
    
    def __str__(self):
        return f'{self.user}: {self.file}'
    
    def document_is_pdf(self):
        return self.file.path.split('.')[-1] == '.pdf'
    
    class Meta:
        verbose_name = 'Документ'
        verbose_name_plural = 'Документ'

