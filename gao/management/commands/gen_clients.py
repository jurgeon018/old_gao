from django.core.management.base import BaseCommand
from ...models import *


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for i in range(100):
            user, created = User.objects.get_or_create(
                username=f'client{i}'
            )
            user.set_password(f'client{i}')
            user.role = User.CLIENT_ROLE
            user.save()
        print('ok')

