from django.urls import path
from .views import getRooms, getRoomInfo, makeAssignment

urlpatterns = [
    path('byUser/<int:userid>', getRooms),
    path('info/<int:roomid>/', getRoomInfo),
    path('createRoom/', createRoom)
    path('createAss/', makeAssignment)
]
