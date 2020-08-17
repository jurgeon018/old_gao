from django.core.management.base import BaseCommand
from ...models import *
from datetime import date, time, datetime, timedelta 
from django.utils import timezone 
import random 
from random import randrange 


def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for i in range(200):
            advocats = User.objects.filter(role=User.ADVOCAT_ROLE)
            clients  = User.objects.filter(role=User.CLIENT_ROLE)

            formats  = Consultation.FORMATS
            statuses = Consultation.STATUSES

            advocat  = random.choice(advocats)
            client   = random.choice(clients)
            format   = random.choice(formats)[0]
            status   = random.choice(statuses)[0] 
            date     = ...
            # https://stackoverflow.com/questions/553303/generate-a-random-date-between-two-other-dates
            d1 = datetime.strptime('1/1/2008 1:30 PM', '%m/%d/%Y %I:%M %p')
            d2 = datetime.strptime('1/1/2009 4:50 AM', '%m/%d/%Y %I:%M %p')
            print(random_date(d1, d2))
            # consult, created = Consultation.objects.get_or_create(
            #     advocat = advocat,
            #     client  = client,
            #     date    = date,
            #     format  = format,
            #     status  = status,
            # )
            # for i in random.randrange(1, 5):
            #     if random.random():
            #         ...
            #     else:
            #         ...
            #     time_from = ...
            #     time_to = ...
            #     ConsultationTime.objects.get_or_create(
            #         consultation=consult,
            #         time_from=time_from,
            #         time_to=time_to,
            #     )
        print('ok')

