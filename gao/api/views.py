from rest_framework import generics 
from rest_framework.decorators import api_view 
from .serializers import * 
import datetime
import calendar
from django.http import JsonResponse

@api_view(['GET'])
def advocat_busy_days(request):
    advocat_id = request.GET.get('advocat_id')
    month = request.GET.get('month')
    year = request.GET.get('year')
    advocat = User.objects.get(id=advocat_id)
    special_days = WorkingDay.objects.filter(advocat=advocat)
    days_available = []
    month_range = range(1, calendar.monthrange(year=int(year), month=int(month))[-1] + 1)
    for i in month_range:
        day = datetime.date(day=i, month=int(month), year=int(year))
        if special_days.filter(date=day):
            days_available.append(day.strftime('%d-%B-%Y'))
            continue
        if day.weekday() == 0 and not advocat.monday:
            continue
        if day.weekday() == 1 and not advocat.tuesday:
            continue
        if day.weekday() == 2 and not advocat.wednesday:
            continue
        if day.weekday() == 3 and not advocat.thursday:
            continue
        if day.weekday() == 4 and not advocat.friday:
            continue
        if day.weekday() == 5 and not advocat.saturday:
            continue
        if day.weekday() == 6 and not advocat.sunday:
            continue
        else:
            days_available.append(day.strftime('%d-%B-%Y'))
    return JsonResponse({"OK": days_available})

import json 

@api_view(['POST','DELETE'])
def set_advocate_faculties(request):
    data        = request.data
    advocat_id  = data["advocat_id"]
    faculty_ids = data["faculty_ids"]
    faculty_ids = json.loads(faculty_ids)
    advocat     = User.objects.get(id=advocat_id)
    faculties   = Faculty.objects.filter(id__in=faculty_ids)
    advocat.faculties.clear()
    advocat.faculties.set(faculties)
    # if request.method == 'POST':
    #     advocat.faculties.add(faculty)
    # if request.method == 'DELETE':
    #     advocat.faculties.remove(faculty)
    return JsonResponse({'OK':'OK'})


@api_view(['POST'])
def add_advocate_document(request):
    data = request.data
    file = request.Files['file']
    advocat_id  = data.get("advocat_id")
    advocat = User.objects.get(id=advocat_id)
    documents = Document.objects.create(user=advocat, file=file)
    return JsonResponse({"OK": "OK"})
