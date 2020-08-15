from django.core.management.base import BaseCommand
from ...models import *



advos = [
    {
        "name":"",
    },
]
class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        for advo in advos:
            print(advo)
        print('ok')

