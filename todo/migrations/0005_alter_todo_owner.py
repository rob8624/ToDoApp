# Generated by Django 4.2.16 on 2024-11-18 22:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_todo_sticky'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='owner',
            field=models.CharField(choices=[('rob', 'Rob'), ('beth', 'Beth'), ('nigel', 'Nigel'), ('joy', 'Joy'), ('joe', 'Joe'), ('hannh and adam', 'Hannah and Adam'), ('rob and beth', 'Rob and Beth'), ('nigel and joy', 'Nigel and Joy'), ('anyone', 'Anyone')], default='anyone', max_length=100),
        ),
    ]
