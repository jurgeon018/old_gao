from django.core.management.base import BaseCommand
from ...models import *
from datetime import date, time, datetime, timedelta 
from django.utils import timezone 
import random 
from random import randrange 

consultations = [
    {
        "start":"6:00",
        "end":"7:00",
    },
    {
        "start":"9:30",
        "end":"12:30",
    },
    {
        "start":"12:30",
        "end":"14:00",
    },
    {
        "start":"14:00",
        "end":"15:30",
    },
    {
        "start":"15:30",
        "end":"18:00",
    },
]

checks = [
    {
        "start":"8:00",
        "end":"9:30",
    },
    {
        "start":"8:00",
        "end":"9:00",
    },
    {
        "start":"7:00",
        "end":"9:30",
    },
    {
        "start":"6:30",
        "end":"9:30",
    },
    {
        "start":"6:30",
        "end":"10:00",
    },
    {
        "start":"7:00",
        "end":"10:00",
    },
]
class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        # r = 1
        r = 100
        # r = 1000
        # Consultation.objects.all().delete()
        for i in range(r):
            print()
            print(f'{i+1}/{r}')
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

            # TODO: получити вільні дати у адвоката get_free_dates
            consult_date  = date.today() - timedelta(days=1) + timedelta(days=random.randint(1, 10))
            # TODO: получити вільні години у адвоката по даті 
            # TODO: получити робочі години у адвоката по даті 
            start = random.randint(0,20)
            while True:
                end   = random.randint(start+1,23)
                if end > start:
                    break
            start = datetime.strptime(f"{start}:{random.choice([0,30])}","%H:%M").time()
            end   = datetime.strptime(f"{end}:{random.choice([0,30])}","%H:%M").time()

            # date_is_free = advocat.date_is_free(date_to=consult_date, date_from=consult_date)
            timerange_is_free = advocat.timerange_is_free(date=consult_date, start=start, end=end)
            print("date_is_free: ", date_is_free)
            print("time_is_free: ", time_is_free)
            print("end: ", end)
            print("start: ", start)
            if timerange_is_free:
            # if True:
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
                print(F'TIMERANGE {start}:{end} IS NOT FREE')
        print('ok')

        # client    = User.objects.get(id=7)
        # advocat   = User.objects.get(id=1)
        # date      = datetime.today()
        # for consultation in consultations:
        #     end   = datetime.strptime(consultation['end'], "%H:%M").time()
        #     start = datetime.strptime(consultation['start'], "%H:%M").time()
        #     Consultation.objects.get_or_create(
        #         start = start,
        #         end   = end,
        #         date      = date,
        #         client    = client,
        #         advocat   = advocat,
        #     )
        # for check in checks:
        #     end   = datetime.strptime(check['end'], "%H:%M").time()
        #     start = datetime.strptime(check['start'], "%H:%M").time()
        #     adv_is_free = advocat.time_is_free(date, end, start)
        #     print()
        #     print(check)
        #     print("adv_is_free: ", adv_is_free)
        #     print()







"""

consult_date  = datetime.now() + timedelta(days=random.randint(1, 20))

# Переводить з об'єкта в строку
consult_date  = consult_date.strftime("%d/%m/%Y %H:%M")

# Переводить з строки в об'єкт
consult_date  = datetime.strptime(consult_date, "%d/%m/%Y %H:%M")


consult_date  = "11.12.2020 14:30"

# Переводить з строки в об'єкт
consult_date  = datetime.strptime(consult_date, "%d/%m/%Y %H:%M")

# Переводить з об'єкта в строку
consult_date  = consult_date.strftime("%d/%m/%Y %H:%M")

"""



