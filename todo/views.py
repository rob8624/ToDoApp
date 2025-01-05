from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from django.http import JsonResponse
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt





def test_connection(request):
    return JsonResponse({"message": "connection established"})


class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    @action(detail=False, methods=['post', 'get'])
    def test_view(self, request):
        return JsonResponse({"message": "connection established viewset test"})
