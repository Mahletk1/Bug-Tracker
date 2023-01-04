from django.db import models
def upload_to(instance, filename):
    return 'users/{filename}'.format(filename=filename)

class User(models.Model):
    name = models.CharField(max_length=200)
    profile_image= models.ImageField(upload_to=upload_to, blank=True, null=True)
    role = models.CharField(max_length=200)