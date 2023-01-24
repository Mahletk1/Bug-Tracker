from django.db import models
def upload_to(instance, filename):
    return 'users/{filename}'.format(filename=filename)

class User(models.Model):
    name = models.CharField(max_length=200)
    profile_image= models.ImageField(upload_to=upload_to, blank=True, null=True)
    role = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    uid =  models.CharField(max_length=200,blank=True, null=True)

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    assignedUser= models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    priority= models.CharField(max_length=200, null=True)
    
class Ticket(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = models.TextField( null=True)
    assignedUser = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True)
    priority= models.CharField(max_length=200, null=True)
    status= models.CharField(max_length=200, null=True)

class Comment(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    ticket = models.ForeignKey(Ticket,on_delete=models.CASCADE, null=True)
    message = models.CharField(max_length=200)
    commenter = models.CharField(max_length=200)