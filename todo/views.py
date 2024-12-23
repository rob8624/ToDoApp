from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer




def test_connection(request):
    return JsonResponse({"message": "connection established"})


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('-created')
    serializer_class = TodoSerializer

