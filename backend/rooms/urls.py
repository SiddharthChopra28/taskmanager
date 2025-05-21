from django.urls import path
from .views import getRooms, makeAssignment, createRoom, joinLink, submitAssignment

urlpatterns = [
    path('byUser/', getRooms),
    # path('info/<int:roomid>/', getRoomInfo),
    path('createRoom/', createRoom),
    path('createAss/', makeAssignment),
    path('join/', joinLink),
    path('submit/', submitAssignment)
]
