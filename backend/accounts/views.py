from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser


class GetUserId(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            useremail = request.data['email']
        except:
            return Response({"error": "send an email"})

        try:
            id = CustomUser.objects.get(email=useremail).id
            return Response({"id": id})
        except:
            return Response({"error": "Not a valid email"})
