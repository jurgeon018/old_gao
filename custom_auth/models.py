from django.db import models 
from django.contrib.auth.models import User, AbstractBaseUser,AbstractUser


from app.models import Consultation

class User(AbstractUser):
  CLIENT_ROLE  = 'client'
  ADVOCAT_ROLE = 'advocat'
  USER_ROLES = [
    (CLIENT_ROLE, "client"),
    (ADVOCAT_ROLE, "advocat"),
  ]
  phone_number = models.CharField(verbose_name="Номер телефону", max_length=255, blank=True, null=True)
  role         = models.CharField(verbose_name="Роль", choices=USER_ROLES, default=CLIENT_ROLE, max_length=255)
  rate         = models.FloatField(verbose_name="Ціна за годину консультації")
  faculty      = models.ManyToManyField(verbose_name="Галузі права", to="app.Faculty", blank=True)
  
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







