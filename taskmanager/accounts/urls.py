from django.urls import path
from .views import GetUserId


urlpatterns = [path('getID', GetUserId.as_view())]
