from django.core.management.base import BaseCommand
from ...models import *




import random 

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for i in range(10):
            user, created = User.objects.get_or_create(
                username=f"advocat_{i}"
            )
            user.role = User.ADVOCAT_ROLE
            user.set_password(f'advocat_{i}')
            user.save()
            print(user)
            if not created:
                for faculty in Faculty.objects.all():
                    if random.random():
                        user.faculties.add(faculty)
        print('ok')

