from django.core.management.base import BaseCommand
from ...models import *
from datetime import date, time, datetime, timedelta 
from django.utils import timezone 
import random 
from random import randrange 

consultations = [
    {
        "start":"6:00:00",
        "end":"7:00:00",
    },
    {
        "start":"9:30:00",
        "end":"12:30:00",
    },
    {
        "start":"12:30:00",
        "end":"14:00:00",
    },
    {
        "start":"14:00:00",
        "end":"15:30:00",
    },
    {
        "start":"15:30:00",
        "end":"18:00:00",
    },
]

checks = [
    {
        "start":"8:00:00",
        "end":"9:30:00",
    },
    {
        "start":"8:00:00",
        "end":"9:00:00",
    },
    {
        "start":"7:00:00",
        "end":"9:30:00",
    },
    {
        "start":"6:30:00",
        "end":"9:30:00",
    },
    {
        "start":"6:30:00",
        "end":"10:00:00",
    },
    {
        "start":"7:00:00",
        "end":"10:00:00",
    },
]
class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # r = 1
        r = 100
        # r = 1000
        for i in range(r):
            print()
            print(f'{i+1}/{r}')
            formats       = Consultation.FORMATS
            statuses      = Consultation.STATUSES
            advocats      = User.objects.filter(role=User.ADVOCAT_ROLE)
            clients       = User.objects.filter(role=User.CLIENT_ROLE)
            advocat       = random.choice(advocats)
            client        = random.choice(clients)
            format        = random.choice(formats)[0]
            status        = random.choice(statuses)[0]

            # TODO: получити вільні дати у адвоката get_free_dates
            consult_date  = date.today() + timedelta(days=random.randint(1, 20))
            # TODO: получити робочі і вільні години у адвоката по даті get_free_hours
            x = random.randint(0,20)
            end   = datetime.strptime(f"{x}:{random.choice([0,30])}:00","%H:%M:%S").time()
            start = datetime.strptime(f"{random.randint(x+1,23)}:{random.choice([0,30])}:00","%H:%M:%S").time()

            # date_is_free = advocat.date_is_free(date_to=consult_date, date_from=consult_date)
            time_is_free = advocat.timerange_is_free(date=consult_date, start=start, end=end)
            # print("date_is_free: ", date_is_free)
            # print("time_is_free: ", time_is_free)
            # print("end: ", end)
            # print("start: ", start)
            # if date_is_free and time_is_free:
            if time_is_free:
            # if True:
                consult, created = Consultation.objects.get_or_create(
                    advocat   = advocat,
                    client    = client,
                    date      = consult_date,
                    end       = end,
                    start     = start,
                    # format    = format,
                    # status    = status,
                )
                print(consult, created)
            else:
                print('NOT FREE')
        print('ok')



        # client    = User.objects.get(id=7)
        # advocat   = User.objects.get(id=1)
        # date      = datetime.today()
        # for consultation in consultations:
        #     end   = datetime.strptime(consultation['end'], "%H:%M:%S").time()
        #     start = datetime.strptime(consultation['start'], "%H:%M:%S").time()
        #     Consultation.objects.get_or_create(
        #         start = start,
        #         end   = end,
        #         date      = date,
        #         client    = client,
        #         advocat   = advocat,
        #     )
        # for check in checks:
        #     end   = datetime.strptime(check['end'], "%H:%M:%S").time()
        #     start = datetime.strptime(check['start'], "%H:%M:%S").time()
        #     adv_is_free = advocat.time_is_free(date, end, start)
        #     print()
        #     print(check)
        #     print("adv_is_free: ", adv_is_free)
        #     print()







"""
consult_date  = datetime.now() + timedelta(days=random.randint(1, 20))
# Переводить з об'єкта в строку
consult_date  = consult_date.strftime("%d/%m/%Y %H:%M:%S")
# Переводить з строки в об'єкт
consult_date  = datetime.strptime(consult_date, "%d/%m/%Y %H:%M:%S")
"""



