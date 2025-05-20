from channels.generic.websocket import AsyncWebsocketConsumer

class PersonalChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("TESTING CONNECTION / REDIS")
        await self.accept()