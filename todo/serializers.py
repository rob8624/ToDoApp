from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    owners_choices = serializers.SerializerMethodField()
    priority_choices = serializers.SerializerMethodField()

    class Meta:
        model =Todo
        fields = '__all__'



    def get_owners_choices(self, obj):
        return Todo.OWNER_CHOICES 
    
    def get_priority_choices(self, obj):
        return Todo.PRIORITY_CHOICES
