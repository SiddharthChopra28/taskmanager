# from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Room
from accounts.models import CustomUser
from accounts.serializers import UserCreateSerializer
from .serializers import RoomSerializer
from chat.serializers import MessageSerializer
from hashlib import sha256
from taskmanager.settings import BASE_URL, SECRET_KEY


# from .serializers import ItemSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRooms(req):
    user = req.user
    student = CustomUser.objects.get(id=user.id)
    rooms= student.rooms.all()

    serializer = RoomSerializer(rooms, many=True)
        
    return Response(serializer.data)
    # return list of all rooms the student is part of
        

        
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getRoomInfo(req, roomid):
#     room = Room.objects.get(id=roomid)
    
#     msgs = room.messages.all()
#     msg_serializer = MessageSerializer(msgs, many=True)
    
#     assignment = room.assignment_name
    
#     students = room.students.all()
#     stud_serializer = UserCreateSerializer(students, many=True)
    
#     owner = room.owner()
#     owner_serializer = UserCreateSerializer(owner)
    
#     assignment_submissions = room.assignment_submissions

#     return Response({'messages': msg_serializer.data, 'assignment_name': assignment, 'assignment_submissions': assignment_submissions, 'students': stud_serializer.data, 'owner': owner_serializer.data})



@api_view(['POST']) 
@permission_classes([IsAuthenticated])
def makeAssignment(req):
    user = req.user
    data = req.data
    roomid = data['roomid']
    room = Room.objects.get(id=roomid)
    studs = Room.students.all()
    if user != room.owner or room.assignment_name != None:
        return Response({'error': 'Unauthorized'})
    
    room.assignment_name = req.name
    room.assignment_submissions = {}
    
    room.save()
    
    return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRoom(req):
    user = req.user
    data = req.data
    serializer = RoomSerializer(data=req.data)
    owner = CustomUser.objects.get(id=user.id)
    
    if serializer.is_valid():

        rm = serializer.save(owner=owner)
        roomid = rm.id
        
        hex_ = sha256(data['name'].encode('utf-8')).hexdigest() + sha256(owner.name.encode('utf-8')).hexdigest() + sha256(SECRET_KEY.encode('utf-8')).hexdigest()

        joincode = str(roomid) + '/' + hex_
        
        return Response({'joincode': joincode}, status=status.HTTP_201_CREATED)
        
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


    
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def joinLink(req):
    user = req.user
    data = req.data
    
    hex_ = data['hash']

    roomid = int(hex_.split('/')[0])

    room = Room.objects.get(id=roomid)
    
    
    ourhex = sha256(room.name.encode('utf-8')).hexdigest() + sha256(room.owner.name.encode('utf-8')).hexdigest() + sha256(SECRET_KEY.encode('utf-8')).hexdigest()
    
    if hex_ != ourhex or user == room.owner:
        return Response({'error': 'Unauthorized'})
    
    user.rooms.add(room)
    
    
    return Response(None, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submitAssignment(req):
    text = req['text']
    roomid = req['roomid']
    room = Room.objects.get(id=roomid)
    userid = req.user.id
    
    prev_submissions = room.assignment_submissions
    if userid in prev_submissions.keys():
        return Response({'error': 'Unauthorized'})
    
    prev_submissions[userid] = text
    room.assignment_submissions = prev_submissions
    
    return Response(None, status=status.HTTP_201_CREATED)
