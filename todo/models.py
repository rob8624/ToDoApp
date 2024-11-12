from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=500, blank=True)
    description = models.CharField(max_length=500, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    

