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
    date      = datetime.strptime(date, "%d.%m.%Y")
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
    hours = []
    for consultation in consultations:
        hours.append({
            "id": consultation.id,
            "start": time.strftime(consultation.start, "%H:%M"),
            "end": time.strftime(consultation.end, "%H:%M"),
        })
    return Response({
        "hours":hours,
        "working_hours":advocat.get_hours_info(date),
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

