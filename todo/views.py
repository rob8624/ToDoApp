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


from django.shortcuts import get_object_or_404
from rest_framework import status

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    @action(detail=False, methods=['post', 'get', 'put'])
    def test_view(self, request, *args, **kwargs):
        new_todos_data = request.data.get('todos', [])
        print("Incoming todos data:", new_todos_data)
        
        if not new_todos_data:
            return Response({"detail": "No todo data provided."})

        errors = []
        updated_todos = []

        try:
            for index, todo_data in enumerate(new_todos_data):
                try:
                    todo = Todo.objects.get(id=todo_data['id'])
                    print(f"Found todo {todo.id}: {todo.title}")
                    todo.order = index
                    todo.save()
                    updated_todos.append(todo.id)
                except Todo.DoesNotExist:
                    errors.append(f"Todo with id {todo_data['id']} not found")
                except KeyError:
                    errors.append(f"Todo data missing ID field: {todo_data}")

            if errors:
                return Response({
                    "errors": errors
                }, status=status.HTTP_400_BAD_REQUEST)

            return Response({
                "message": "Todos reordered successfully",
                "updated": updated_todos
            })

        except Exception as e:
            return Response({
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)