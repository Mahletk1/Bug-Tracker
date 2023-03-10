"""bug_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from bug_tracker import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', views.get_users),
    path('projects/', views.project),
    path('tickets/', views.ticket),
    path('comments/', views.comments),
    path('attachments/', views.attachments),
    # path('ticket/', views.ticket_detail),
    path('ticket/<int:pk>', views.ticket_detail.as_view()),
    path('project/<int:pk>', views.project_detail.as_view()),
    # path('users/<int:id>', views.delete_user),
    # path('createUsers/', views.create_users)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
