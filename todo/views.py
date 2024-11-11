from django.shortcuts import render

from django.http import JsonResponse

# Create your views here.


def test_connection(request):
    return JsonResponse({"message": "connection established"})
