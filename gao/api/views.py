from django.http import JsonResponse

from rest_framework import generics 
from rest_framework.decorators import api_view 
from rest_framework.response import Response

from .serializers import * 

from datetime import date, datetime, time, timezone, timedelta
import calendar
import json 


@api_view(['GET'])
def get_days_info(request, type=None):
    query     = request.query_params#; print("query: ", query)
    month     = int(query['month'])
    year      = int(query['year'])
    advocat   = query['advocat']
    client    = query['client']
    advocat   = User.objects.get(id=advocat)
    client    = User.objects.get(id=client)
    # TODO: перевірки по клієнту 
    return Response({
        "days":advocat.get_days_info(year, month),
    })


@api_view(['GET'])
def get_hours_info(request):
    query     = request.query_params#; print("query: ", query)
    date      = query['date']
    advocat   = query['advocat']
    client    = query['client']
    advocat   = User.objects.get(id=advocat)
    client    = User.objects.get(id=client)
    # TODO: перевірки по клієнту 
    return Response({
        "hours":advocat.get_hours_info(date),
    })


@api_view(['GET'])
def get_working_hours_info(request):
    query     = request.query_params#; print("query: ", query)
    date      = query['date']
    advocat   = query['advocat']
    date      = datetime.strptime(date, "%d.%m.%Y")
    advocat   = User.objects.get(id=advocat)
    consultations = Consultation.objects.filter(
        date=date,
        advocat=advocat,
    )

    # TODO: перенести в модель в метод User.get_working_hours(date)
    working_hours = []
    user_working_day = UserWorkingDay.objects.filter(
        advocat=advocat, 
        date=date,
    ).first()
    user_week_day = UserWeekDay.objects.filter(
        user=advocat, 
        week_day__code=date.isoweekday(),
    ).first()
    if user_working_day:
        start = user_working_day.start
        end = user_working_day.end
    elif user_week_day:
        start = user_week_day.start
        end = user_week_day.end
    else:
        start = None
        end = None
    if start and end:
        start = time.strftime(start, '%H:%M')
        end   = time.strftime(end, '%H:%M')
        if start.endswith(':30'):
            start = start.split(':')[0]
            start = int(start)+1
        else:
            start = start.split(':')[0]
        if end.endswith(':30'):
            end = end.split(':')[0]
            end = int(end) + 1 
        else:
            end = end.split(':')[0]
        raw_working_hours = list(range(int(start), int(end)+1))
        for raw_working_hour in raw_working_hours:
            working_hour = raw_working_hour
            working_hours.append(f'{working_hour}:00')
            if raw_working_hour != raw_working_hours[-1]:
                working_hours.append(f"{working_hour}:30")
    # get_working_hours(date)
    hours = []
    for consultation in consultations:
        hours.append({
            "id": consultation.id,
            "start": consultation.start,
            "end": consultation.end,
        })
    return Response({
        "hours":hours,
        "working_hours":working_hours,
    })


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
    # elif request.method == 'DELETE':
    #     advocat.faculties.remove(faculty)
    return JsonResponse({'OK':'OK'})

