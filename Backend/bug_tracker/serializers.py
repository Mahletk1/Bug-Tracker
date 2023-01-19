from rest_framework import serializers
from .models import User,Project

class FirebaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['error']
   
class UserSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()

    def get_projects(self, obj):
        queryset = Project.objects.filter(assignedUser=obj.id)
        serializer = ProjectSerializer(queryset, many=True)
        return serializer.data
    class Meta:
        model = User
        fields = ['id','name','profile_image', 'role','email','uid','projects']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','title','description', 'assignedUser','priority']

        depth = 1

