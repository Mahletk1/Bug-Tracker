from django.http import JsonResponse
from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth,credentials
import firebase_admin

cred = credentials.Certificate("C:/Users/mahku/Bug-Tracker/Backend/privateKey.json")
default_app = firebase_admin.initialize_app(cred)

@api_view(['GET','POST','PUT'])
def get_users(request):
    if request.method == 'GET':
        users= User.objects.all()
        serializer = UserSerializer(users, many=True, context={'request': request})
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        user = User.objects.get(pk=request.data['id'])
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def create_users(request):
    if request.method == 'POST':
        user = auth.create_user(
        email=request.data['email'],
        email_verified=False,
        password=request.data['password'],
        disabled=False)
        return Response("Successfully created new user", status=status.HTTP_201_CREATED)
        # print('Sucessfully created new user: {0}'.format(user.uid))