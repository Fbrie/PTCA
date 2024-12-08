from django.contrib import admin
from .models import User, Message, StudentProgress, Meeting

# Register your models here.

# Customize User model in the admin panel
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'is_teacher', 'is_parent', 'date_joined')  # Display username, email, roles, and join date
    search_fields = ('username', 'email')  # Enable search by username and email
    list_filter = ('is_teacher', 'is_parent')  # Add filter options for teacher and parent roles
    ordering = ('date_joined',)  # Order users by the join date

# Customize Message model in the admin panel
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'timestamp', 'read')  # Show sender, receiver, timestamp, and read status
    search_fields = ('sender__username', 'receiver__username', 'content')  # Enable search by sender, receiver, and content
    list_filter = ('read', 'timestamp')  # Add filters for read status and timestamp
    ordering = ('-timestamp',)  # Order messages by most recent

# Customize StudentProgress model in the admin panel
class StudentProgressAdmin(admin.ModelAdmin):
    list_display = ('student', 'subject', 'grade', 'date')  # Show student, subject, grade, and date
    search_fields = ('student__username', 'subject', 'grade')  # Enable search by student, subject, and grade
    list_filter = ('subject', 'grade')  # Add filters for subject and grade
    ordering = ('-date',)  # Order progress reports by most recent

# Customize Meeting model in the admin panel
class MeetingAdmin(admin.ModelAdmin):
    list_display = ('teacher', 'parent', 'scheduled_time', 'status')  # Show teacher, parent, time, and status
    search_fields = ('teacher__username', 'parent__username', 'agenda')  # Enable search by teacher, parent, and agenda
    list_filter = ('status', 'scheduled_time')  # Add filters for status and scheduled time
    ordering = ('-scheduled_time',)  # Order meetings by most recent

# Register the models with the customized admin classes
admin.site.register(User, UserAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(StudentProgress, StudentProgressAdmin)
admin.site.register(Meeting, MeetingAdmin)
