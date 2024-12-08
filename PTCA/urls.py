"""URL configuration for PTCA project."""
from django.contrib import admin
from django.urls import path
from PTCA import views  # Import views from the app
from django.conf import settings
from django.conf.urls.static import static  # Import static
from django.urls import path
from .views import ProgressView
from django.views.generic import TemplateView
from django.urls import path, include




urlpatterns = [
    path('api/', include('your_api.urls')),  # Your backend API routes
    path('', TemplateView.as_view(template_name="index.html")),  # React frontend
    path('admin/', admin.site.urls),  # Admin panel
    path('', views.home, name='home'),  # Home page
    path('login/', views.login_view, name='login'),  # Login page
    path('messages/', views.message_list, name='message_list'),  # Message list
    path('messages/create/', views.create_message, name='create_message'),  # Create a message
    path('messages/<int:message_id>/', views.message_detail, name='message_detail'),  # Message details
    path('progress/', views.student_progress_list, name='student_progress_list'),  # Progress reports
    path('progress/<int:progress_id>/', views.student_progress_detail, name='student_progress_detail'),  # Progress details
    path('meetings/', views.meeting_list, name='meeting_list'),  # Meeting list
    path('meetings/create/', views.create_meeting, name='create_meeting'),  # Create a meeting
    path('meetings/<int:meeting_id>/', views.meeting_detail, name='meeting_detail'),  # Meeting details
    path('progress/', ProgressView.as_view(), name='progress'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

