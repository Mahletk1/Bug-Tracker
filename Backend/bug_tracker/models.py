from django.db import models

class User(models.Model):
    name = models.CharField(max_length=200)
    profile_image= models.ImageField(upload_to='users')
    role = models.CharField(max_length=200)