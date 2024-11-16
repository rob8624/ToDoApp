from django.db import models

# Create your models here.
class Todo(models.Model):

    OWNER_CHOICES = [
        ('rob', 'Rob'),
        ('beth', 'Beth'),
        ('nigel', 'Nigel'),
        ('joy', 'Joy'),
        ('joe', "Joe"),
        (' rob and beth', "Rob and Beth"),
        ('nigel and joy', "Nigel and Joy"),
        ('anyone', "Anyone")]
    
    PRIORITY_CHOICES =[
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    title = models.CharField(max_length=500, blank=True)
    description = models.CharField(max_length=500, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    owner = models.CharField(max_length=100, choices=OWNER_CHOICES, default='anyone')
    priority = models.CharField(max_length=100, choices=PRIORITY_CHOICES, default='high')
    

    def __str__(self) -> str:
        return self.title
    

