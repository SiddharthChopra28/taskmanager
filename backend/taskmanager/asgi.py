"""
ASGI config for taskmanager project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter,URLRouter
from chat.route import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'taskmanager.settings')

application = get_asgi_application()

application = ProtocolTypeRouter({
    "http":application,
    "websocket":URLRouter(websocket_urlpatterns)
})