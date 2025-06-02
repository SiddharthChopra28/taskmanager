# from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Room
from accounts.models import CustomUser
from accounts.serializers import UserCreateSerializer
from .serializers import RoomSerializer
from chat.serializer import UserGetSerializer
from hashlib import sha256
from taskmanager.settings import BASE_URL, SECRET_KEY


# from .serializers import ItemSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRooms(req):

    rooms= req.user.rooms.all()
    
    out = []
    for room in rooms:
        d = {}
        d['roomid'] = room.id
        d['name'] = room.name
        d['owner'] = room.owner.id
        d['assignment_name'] = room.assignment_name
        d['submissions'] = room.assignment_submissions
        d['students'] = [s.id for s in room.students.all()]

        out.append(d)
    
        
    return Response(out)
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



    if user != room.owner or room.assignment_name != '':
        return Response({'error': 'Unauthorized'})
    
    room.assignment_name = data['assignment_name']
    room.assignment_submissions = {}
    
    room.save()
    
    return Response({'message': 'vinayak is gay'} , status=status.HTTP_201_CREATED)


def generateLink(roomid, roomname, username, key):
    return str(roomid) + '/' + sha256(roomname.encode('utf-8')).hexdigest() + sha256(username.encode('utf-8')).hexdigest() + sha256(key.encode('utf-8')).hexdigest()

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createRoom(req):
    user = req.user
    data = req.data
    
    room = Room(
    name=data['name'],
    owner=user,
    assignment_name="",
    assignment_submissions={}
    )
    room.save()
    
    user.rooms.add(room)

    roomid = room.id
    
    joincode = generateLink(roomid, data['name'], user.name, SECRET_KEY)
    
    return Response({'joincode': joincode}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getLink(req):
    user = req.user
    roomid = req.GET['roomid']
    roomname = req.GET['roomname']
    username = user.name
    link = generateLink(roomid, roomname, username, SECRET_KEY)
    
    return Response({'joincode': link}, status=status.HTTP_201_CREATED)
    

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def joinLink(req):
    user = req.user
    data = req.data
    
    hex_ = data['hash']

    roomid = int(hex_.split('/')[0])

    room = Room.objects.get(id=roomid)
    
    
    ourhex = str(roomid) + '/' + sha256(room.name.encode('utf-8')).hexdigest() + sha256(room.owner.name.encode('utf-8')).hexdigest() + sha256(SECRET_KEY.encode('utf-8')).hexdigest()
    
    
    if hex_ != ourhex or user == room.owner:
        return Response({'error': 'Unauthorized'})
    
    user.rooms.add(room)
    
    
    return Response(None, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submitAssignment(req):
    text = req.data['text']
    roomid = req.data['roomid']
    room = Room.objects.get(id=roomid)
    userid = req.user.id

    prev_submissions = room.assignment_submissions
    if userid in prev_submissions.keys():
        return Response({'error': 'Unauthorized'})
    
    prev_submissions[req.user.email] = text
    room.assignment_submissions = prev_submissions
    room.save()
    
    return Response({'hi': 'vinayak is gae'}, status=status.HTTP_201_CREATED)
