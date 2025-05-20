from django.db import models
from accounts.models import CustomUser

class Room(models.Model):
    
    name = models.TextField()
    owner = models.ForeignKey(CustomUser)
    students = models.ManyToManyField(CustomUser, related_name='rooms')

    #also has a messages object, from foreign key
    #also has a assignments 
    
    
class Assignment(models.Model):
    parent_room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='assignments')
    expected_from = models.ManyToManyField(CustomUser, related_name='all_assignments')
    submissions = models.ManyToManyField(CustomUser, related_name='submitted')
    due_date = models.DateTimeField()
    # assignment files will be stored in a specific folder, and files will be named as : AID_{ID}_UID_{ID}.pdf

