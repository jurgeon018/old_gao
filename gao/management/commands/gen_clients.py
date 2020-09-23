from django.core.management.base import BaseCommand
from ...models import *


class Command(BaseCommand):
    user, _ = User.objects.get_or_create(
        username="admin2"
    )
    user.role = User.CLIENT_ROLE
    user.is_staff = True
    user.is_superuser = True
    user.set_password('admin2')
    user.save()
    def handle(self, *args, **kwargs):
        for i in range(10):
            user, created = User.objects.get_or_create(
                username=f'client{i}'
            )
            user.set_password(f'client{i}')
            user.role = User.CLIENT_ROLE
            user.save()
        print('ok')

