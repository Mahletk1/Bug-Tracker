from django.http import JsonResponse
from .models import User,Project
from .serializers import UserSerializer,FirebaseUserSerializer,ProjectSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from firebase_admin import auth,credentials
import firebase_admin

cred = credentials.Certificate("C:/Users/mahku/Bug-Tracker/Backend/privateKey.json")
default_app = firebase_admin.initialize_app(cred)

@api_view(['GET','POST','PUT','DELETE'])
def get_users(request):
    if request.method == 'GET':
        users= User.objects.all()
        serializer = UserSerializer(users, many=True, context={'request': request})
        return Response(serializer.data)

    if request.method == 'POST':
        try:
            user = auth.create_user(
            email=request.data['email'],
            email_verified=False,
            password=request.data['password'],
            disabled=False)

            userData = {
            'uid':user.uid,
            'name':request.data['name'],
            'email':request.data['email'],
            'profile_image':request.data['profile_image'],
            'role':request.data['role']
        }
            serializer = UserSerializer(data=userData)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print(serializer.errors)
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response(str(e),status=status.HTTP_400_BAD_REQUEST)
       
       
    
    if request.method == 'PUT':
        user = User.objects.get(pk=request.data['id'])
        try:
            auth.update_user(
            request.data['uid'],
            email=request.data['email'],
            password=request.data['password'])

            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(e)
            return Response(str(e),status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        user = User.objects.get(pk=request.query_params['id'])
        try:
            user.delete()
            auth.delete_user(request.query_params['uid'])
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response(str(e),status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','DELETE','PUT','POST'])
def project(request):
    if request.method == 'GET':
        projects= Project.objects.all()
        serializer = ProjectSerializer(projects, many=True, context={'request': request})
        return Response(serializer.data)
    if request.method == 'POST':
        new_project = Project.objects.create(
            assignedUser= User.objects.get(pk=request.data['assignedUser'] ),
            title= request.data['title'],
            description= request.data['description'],
            priority = request.data['priority'] )
        new_project.save()

        serializer = ProjectSerializer(new_project)    
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     print(serializer.errors)
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        print(request.data)
        project = Project.objects.get(pk=request.data['id'])
        # assignedUser = User.objects.get(pk=request.data['assignedUser'])
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
       