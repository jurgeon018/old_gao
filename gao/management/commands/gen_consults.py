from django.core.management.base import BaseCommand
from ...models import *
from datetime import date, time, datetime, timedelta 
from django.utils import timezone 
import random 
from random import randrange 


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for i in range(100):
            advocats = User.objects.filter(role=User.ADVOCAT_ROLE)
            clients  = User.objects.filter(role=User.CLIENT_ROLE)

            formats  = Consultation.FORMATS
            statuses = Consultation.STATUSES

            advocat  = random.choice(advocats)
            client   = random.choice(clients)
            format   = random.choice(formats)[0]
            status   = random.choice(statuses)[0]

            delta    = timedelta(
                days    = random.randint(1, 60),
                hours   = random.randint(1, 2),
                seconds = random.randint(1, 60),
            )
            print("delta:", delta)
            # time_to   = 
            # time_from = 
            date_str  = datetime.now() + delta
            date_str  = date_str.strftime("%d/%m/%Y %H:%M:%S")
            date      = datetime.strptime(date_str, "%d/%m/%Y %H:%M:%S")
            
            # consult, created = Consultation.objects.get_or_create(
            #     advocat   = advocat,
            #     client    = client,
            #     date      = date,
            #     # time_to   = time_to,
            #     # time_from = time_from,
            #     format    = format,
            #     status    = status,
            # )
        print('ok')

