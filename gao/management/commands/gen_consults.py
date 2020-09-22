from django.core.management.base import BaseCommand
from ...models import *
from datetime import date, time, datetime, timedelta 
from django.utils import timezone 
import random 
from random import randrange 

def get_24_hours():
  hours = []
  raw_hours = list(range(0, 23))
  for hour in raw_hours:
    hours.append(f'{hour}:00')
    if hour != list[-1]:
      hours.append(f'{hour}:30')
  return hours



class Command(BaseCommand):
  def handle(self, *args, **kwargs):
    hours_24 = get_24_hours()
    r = 100
    Consultation.objects.all().delete()
    for i in range(r):
      print(f'{i+1}/{r}'); print(); 
      formats       = Consultation.FORMATS
      statuses      = Consultation.STATUSES
      faculties     = Faculty.objects.all()
      advocats      = User.objects.filter(role=User.ADVOCAT_ROLE)
      clients       = User.objects.filter(role=User.CLIENT_ROLE)
      advocat       = random.choice(advocats)
      faculty       = random.choice(faculties)
      client        = random.choice(clients)
      format        = random.choice(formats)[0]
      status        = random.choice(statuses)[0]

      while True:
        consult_date  = date.today() - timedelta(days=3) + timedelta(days=random.randint(1, 10))
        # TODO: перевірки по клієнту
        if advocat.day_is_free(consult_date):
          break

      while True:
        start = random.choice(hours_24)
        # TODO: перевірки по клієнту
        hour_is_free = advocat.hour_is_free(consult_date, start)
        if hour_is_free:
          break

      while True:
        end = random.choice(hours_24)
        # TODO: перевірки по клієнту
        hour_is_free = advocat.hour_is_free(consult_date, end)
        if hour_is_free and end > start:
          break

      timerange_is_free = advocat.timerange_is_free(date=consult_date, start=start, end=end)
      if timerange_is_free:
        consult, created = Consultation.objects.get_or_create(
          advocat   = advocat,
          client    = client,
          date      = consult_date,
          start     = start,
          end       = end,
          # format    = format,
          # status    = status,
        )
        print(consult, created)
      else:
        print(f'TIMERANGE {start}:{end} IS NOT FREE')
    print('ok')


"""
consult_date  = datetime.now() + timedelta(days=random.randint(1, 20))

# Переводить з об'єкта в строку
consult_date  = consult_date.strftime("%d/%m/%Y %H:%M")

# Переводить з строки в об'єкт
consult_date  = datetime.strptime(consult_date, "%d/%m/%Y %H:%M")
"""

"""
consult_date  = "11.12.2020 14:30"

# Переводить з строки в об'єкт
consult_date  = datetime.strptime(consult_date, "%d/%m/%Y %H:%M")

# Переводить з об'єкта в строку
consult_date  = consult_date.strftime("%d/%m/%Y %H:%M")
"""
