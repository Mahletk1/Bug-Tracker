from rest_framework import serializers
from .models import User,Project

class FirebaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['error']
   
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','profile_image', 'role','email','uid']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','title','description', 'assignedUser','priority']

        # depth = 1

