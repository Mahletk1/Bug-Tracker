from django.contrib import admin
from .models import User,Project,Ticket

admin.site.register(User)
admin.site.register(Project)
admin.site.register(Ticket)