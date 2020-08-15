from .models import * 
from sw_blog.models import Post 


def team(request):
    team    = Team.objects.all()
    posts   = Post.objects.all()
    clients = Client.objects.all()
    sliders = Slider.objects.all()
    return locals()


