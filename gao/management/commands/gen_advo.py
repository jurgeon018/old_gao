from django.core.management.base import BaseCommand
from ...models import *




import random 

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for i in range(10):
            user, created = User.objects.get_or_create(
                username=f"advocat{i}"
            )
            user.role = User.ADVOCAT_ROLE
            user.is_stuff = True
            user.is_superuser = True
            user.set_password(f'advocat{i}')
            user.rate = random.randrange(100, 1000)
            user.save()
            if not created:
                for faculty in Faculty.objects.all():
                    print(faculty)
                    print(random.random())
                    if random.random():
                        user.faculties.add(faculty)
        print('ok')

