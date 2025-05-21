from django.db import models
from accounts.models import CustomUser

class Room(models.Model):
    
    name = models.TextField()
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    students = models.ManyToManyField(CustomUser, related_name='rooms')
    assignment_name = models.TextField()
    assignment_submissions = models.JSONField()

    #also has a messages object, from foreign key
    
