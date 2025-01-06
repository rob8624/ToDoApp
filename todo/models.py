from django.db import models

# Create your models here.
class Todo(models.Model):

    OWNER_CHOICES = [
        ('rob', 'Rob'),
        ('beth', 'Beth'),
        ('nigel', 'Nigel'),
        ('joy', 'Joy'),
        ('joe', "Joe"),
        ('hannh and adam', "Hannah and Adam"),
        ('rob and beth', "Rob and Beth"),
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
    sticky = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    

    def __str__(self) -> str:
        return self.title
    
    def save(self, *args, **kwargs):
    # Automatically assign order if not already set (for new todos)
        if self.order == 0:  # Assuming you want to set order to the last + 1
            max_order = Todo.objects.aggregate(models.Max('order'))['order__max'] or 0
            self.order = max_order + 1
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['order'] 
    

