# Generated by Django 5.2.1 on 2025-05-21 01:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
        ('rooms', '0002_room_assignment_name_room_assignment_submissions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='parent_room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='rooms.room'),
        ),
        migrations.AlterField(
            model_name='message',
            name='text',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='message',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
