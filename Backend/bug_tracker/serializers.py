from rest_framework import serializers
from .models import User

class FirebaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['error']
   
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','profile_image', 'role','email','uid']

