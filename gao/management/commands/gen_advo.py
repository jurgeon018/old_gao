from django.core.management.base import BaseCommand
from ...models import *




import random 
advocats = [
    {
        "name":"Адвокат 1",
        "username":"advocat1",
        "password":"advocat1",
        "faculties":[1,2,3],
        "rate":100,
    },
    {
        "name":"Адвокат 2",
        "username":"advocat2",
        "password":"advocat2",
        "faculties":[2,3,4],
        "rate":110,
    },
    {
        "name":"Адвокат 3",
        "username":"advocat3",
        "password":"advocat3",
        "faculties":[3,4,5],
        "rate":120,
    },
    {
        "name":"Адвокат 4",
        "username":"advocat4",
        "password":"advocat4",
        "faculties":[4,5,6],
        "rate":130,
    },
]



class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        user, _ = User.objects.get_or_create(
            username="admin",
        )
        user.role = User.ADVOCAT_ROLE
        user.rate = 100
        user.is_staff = True
        user.is_superuser = True
        user.set_password("admin")
        user.save()
        for advocat in advocats:
            user, created = User.objects.get_or_create(
                username=advocat['username'],
            )
            user.role = User.ADVOCAT_ROLE
            user.is_stuff = True
            user.is_superuser = True
            user.set_password(advocat['password'])
            user.rate = advocat['rate']
            user.save()
            user.faculties.set(Faculty.objects.filter(id__in=advocat['faculties']))
        print('ok')





