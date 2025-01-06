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

    @action(detail=False, methods=['post', 'get', 'put'])
    def test_view(self, request, *args, **kwargs):
 
        new_todos_data = request.data.get('todos', [])
        print(new_todos_data)
        
        if not new_todos_data:
            return Response({"detail": "No todo data provided."})

        # Delete all existing Todo objects
        Todo.objects.all().delete()
        print('deleted')

        # Create new Todo objects from the provided data
        created_todos = []
        errors = []
        order_count = 0

        for todo_data in new_todos_data:
             
             todo_data['order'] = order_count
             order_count += 1  # Increment the counter
    
             print(todo_data['order'])
            
            
             serializer = TodoSerializer(data=todo_data)

             if serializer.is_valid():
                # Save the new Todo object
                print('valid')
                todo = serializer.save()
                created_todos.append(serializer.data)
             else:
                errors.append({"error": serializer.errors})

        if errors:
            return Response({"created_todos": created_todos, "errors": errors})

        return Response({"created_todos": created_todos})