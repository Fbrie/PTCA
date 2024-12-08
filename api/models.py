from django.db import models
from django.contrib.auth.models import AbstractUser

# User types
USER_TYPE_CHOICES = [
    ('teacher', 'Teacher'),
    ('parent', 'Parent'),
]

class User(AbstractUser):
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    bio = models.TextField(blank=True, null=True)
    is_teacher = models.BooleanField(default=False)
    is_parent = models.BooleanField(default=False)

    def __str__(self):
        return self.username

# Message model for parent-teacher communication
class Message(models.Model):
    sender = models.ForeignKey(
        User, related_name="sent_messages", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User, related_name="received_messages", on_delete=models.CASCADE
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender.username} to {self.receiver.username}"

# Student progress model
class StudentProgress(models.Model):
    student = models.ForeignKey(
        User, related_name="progress_reports", on_delete=models.CASCADE, 
        limit_choices_to={'user_type': 'parent'}
    )
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
    teacher = models.ForeignKey(
        User, related_name="teacher_meetings", on_delete=models.CASCADE, 
        limit_choices_to={'user_type': 'teacher'}
    )
    parent = models.ForeignKey(
        User, related_name="parent_meetings", on_delete=models.CASCADE, 
        limit_choices_to={'user_type': 'parent'}
    )
    scheduled_time = models.DateTimeField()
    agenda = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[
            ('Scheduled', 'Scheduled'),
            ('Completed', 'Completed'),
            ('Cancelled', 'Cancelled'),
        ],
        default='Scheduled',
    )

    def __str__(self):
        return f"Meeting: {self.teacher.username} with {self.parent.username} at {self.scheduled_time}"
