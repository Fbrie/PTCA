from django.db import models
from django.contrib.auth.models import AbstractUser

from rest_framework import serializers


# Create your models here.

# Define user types
USER_TYPE_CHOICES = [
    ('teacher', 'Teacher'),
    ('parent', 'Parent'),
]

class User(AbstractUser):
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    bio = models.TextField(blank=True, null=True)


    def __str__(self):
        return self.username
class User(AbstractUser):

    is_teacher = models.BooleanField(default=False)
    is_parent = models.BooleanField(default=False)


    def __str__(self):
        return self.username

# Message model for parent-teacher communication
class Message(models.Model):
    sender = models.ForeignKey(User, related_name="sent_messages", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="received_messages", on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"
    

class Message(models.Model):
    sender = models.CharField(max_length=255)
    recipient = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender} to {self.recipient} on {self.timestamp}"


# Student progress model
class StudentProgress(models.Model):
    student = models.ForeignKey(User, related_name="progress_reports", on_delete=models.CASCADE, limit_choices_to={'user_type': 'parent'})
    subject = models.CharField(max_length=100)
    GRADE_CHOICES = [
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('F', 'F'),
    ]
    grade = models.CharField(max_length=2, choices=GRADE_CHOICES)
    comments = models.TextField(blank=True)
    date = models.DateField()

    def __str__(self):
        return f"Progress for {self.student.username} in {self.subject} on {self.date}"

# Meeting model for teacher-parent meetings
class Meeting(models.Model):
    teacher = models.ForeignKey(User, related_name="teacher_meetings", on_delete=models.CASCADE, limit_choices_to={'user_type': 'teacher'})
    parent = models.ForeignKey(User, related_name="parent_meetings", on_delete=models.CASCADE, limit_choices_to={'user_type': 'parent'})
    scheduled_time = models.DateTimeField()
    agenda = models.TextField()
    status = models.CharField(max_length=20, choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')], default='Scheduled')

    def __str__(self):
        return f"Meeting: {self.teacher.username} with {self.parent.username} at {self.scheduled_time}"
    
    class Meeting(models.Model):
     teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="teacher_meetings")
    parent = models.ForeignKey(User, on_delete=models.CASCADE, related_name="parent_meetings")
    scheduled_time = models.DateTimeField()
    subject = models.CharField(max_length=255)

    def __str__(self):
        return f"Meeting between {self.teacher.username} and {self.parent.username}"

    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_teacher', 'is_parent')

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'is_teacher', 'is_parent')
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

