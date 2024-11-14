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
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class OwnerChoiceView(APIView):
    def get(self, request):
     
        owner_choices = [
            ('rob', 'Rob'),
            ('beth', 'Beth'),
            ('nigel', 'Nigel'),
            ('joy', 'Joy'),
            ('joe', "Joe"),
            ('rob and beth', "Rob and Beth"),
            ('nigel and joy', "Nigel and Joy"),
            ('anyone', "Anyone")
        ]
        
        return Response