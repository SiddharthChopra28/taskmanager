from django.db import models
from rooms.models import Room
from accounts.models import CustomUser

    
class Message(models.Model):
    parent_room = models.ForeignKey(Room, related_name="+", on_delete=models.CASCADE)
    text = models.TextField(null=False) 
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(CustomUser, related_name='+', on_delete=models.SET_NULL, null=1)
    
