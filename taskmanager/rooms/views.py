# from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Room
from ..accounts.models import CustomUser
from ..accounts.serializers import UserSerializer
from .serializers import RoomSerializer, AssignmentSerializer
from ..chat.serializers import MessageSerializer
from hashlib import sha256
from ..taskmanager.settings import BASE_URL, SECRET_KEY


# from .serializers import ItemSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRooms(request, userid):
    student = CustomUser.objects.get(id=userid)
    rooms= student.rooms.all()

    serializer = RoomSerializer(rooms, many=True)
        
    return Response(serializer.data)
    # return list of all rooms the student is part of
        

        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoomInfo(req, roomid):
    room = Room.objects.get(id=roomid)
    
    msgs = room.messages.all()
    msg_serializer = MessageSerializer(msgs, many=True)
    
    assignments = room.assignments.all()
    ass_serializer = AssignmentSerializer(assignments, many=True)
    
    students = room.students.all()
    stud_serializer = UserSerializer(students, many=True)
    
    owner = room.owner()
    owner_serializer = UserSerializer(owner)

    return Response({'messages': msg_serializer.data, 'assignments': ass_serializer.data, 'students': stud_serializer.data, 'owner': owner_serializer.data})



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def makeAssignment(req):
    user = req.user
    data = req.data
    roomid = data['roomid']
    room = Room.objects.get(id=roomid)
    if user != room.owner:
        return Response({'error': 'Unauthorized'})
    
    serializer = AssignmentSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generateLink(req):
    user = req.user
    data = req.data
    roomid = data['roomid']
    room = Room.objects.get(id=roomid)
    if user != room.owner:
        return Response({'error': 'Unauthorized'})
    
    room_name = room.name
    room_id = str(room.id)
    room_owner = room.owner.name
    
    hex_ = sha256(room_name.encode('utf-8')).hexdigest() + sha256(room_id.encode('utf-8')).hexdigest() + sha256(room_owner.encode('utf-8')).hexdigest() + sha256(SECRET_KEY.encode('utf-8')).hexdigest()

    return Response({'link': f"{BASE_URL}/join/{hex_}"})
    
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def joinLink(req):
    user = req.user
    data = req.data
    roomid = data['roomid']
    room = Room.objects.get(id=roomid)
    
    hex_ = data['hash']
    
    ourhex = sha256(room.name.encode('utf-8')).hexdigest() + sha256(room.id.encode('utf-8')).hexdigest() + sha256(room.owner.name.encode('utf-8')).hexdigest() + sha256(SECRET_KEY.encode('utf-8')).hexdigest()
    
    if hex_ != ourhex or user == room.owner:
        return Response({'error': 'Unauthorized'})
    
    user.rooms.add(room)
    
    
    return Response(None, status=status.HTTP_201_CREATED)