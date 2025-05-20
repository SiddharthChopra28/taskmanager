from django.urls import path
from .views import getRooms, getRoomInfo, makeAssignment

urlpatterns = [
    path('byUser/<int:userid>', getRooms),
    path('rooms/<int:roomid>/', getRoomInfo),
    path('createAss/', makeAssignment)
]
