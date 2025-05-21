from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from rest_framework import status

class GetUserId(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            useremail = request.data['email']
        except:
            return Response(status = status.HTTP_400_BAD_REQUEST)

        try:
            id = CustomUser.objects.get(email=useremail).id
            return Response({"id": id}, status=status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_400_BAD_REQUEST)
    