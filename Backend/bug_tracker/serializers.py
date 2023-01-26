from rest_framework import serializers
from .models import User,Project,Ticket,Comment,Attachment

class FirebaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['error']
   
class UserSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()
    tickets = serializers.SerializerMethodField()

    def get_projects(self, obj):
        queryset = Project.objects.filter(assignedUser=obj.id)
        serializer = UserProjectSerializer(queryset, many=True)
        return serializer.data
    def get_tickets(self, obj):
        queryset = Ticket.objects.filter(assignedUser=obj.id)
        serializer = UserTicketSerializer(queryset, many=True)
        return serializer.data
    
    class Meta:
        model = User
        fields = ['id','name','profile_image', 'role','email','uid','projects','tickets']

class ProjectSerializer(serializers.ModelSerializer):
    tickets = serializers.SerializerMethodField()

    def get_tickets(self, obj):
        queryset = Ticket.objects.filter(project=obj.id)
        serializer = TicketSerializer(queryset, many=True)
        return serializer.data
    class Meta:
        model = Project
        fields = ['id','title','description', 'assignedUser','priority','tickets']

        depth = 1

class UserTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['created_at','updated_at','id','title','priority','status']

class UserProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id','title','description','priority']


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = ['created_at','updated_at','id','title','description','priority','status','assignedUser','project']

        depth = 1

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['created_at','message','commenter','ticket']

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['created_at','note','uploader','ticket','attachments']