from .models import * 


def team(request):
    team    = Team.objects.all()
    posts   = Post.objects.all()
    clients = Client.objects.all()
    return locals()


