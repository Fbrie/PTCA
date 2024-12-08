from django.shortcuts import render , request
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.views import View
from django.http import JsonResponse
from .forms import MessageForm
from .models import User, Message, StudentProgress, Meeting
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer

class MessageListView(APIView):
    def get(self, request):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User created successfully", "user": UserSerializer(user).data})
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({"refresh": str(refresh), "access": str(refresh.access_token)})
        return Response({"error": "Invalid credentials"}, status=400)


# Home view
def home(request):
    return render(request, 'home.html')

# View for messages (teacher-parent communication)
@login_required
def message_list(request):
    if request.user.user_type == 'teacher':
        messages = Message.objects.filter(sender=request.user) | Message.objects.filter(receiver=request.user)
    elif request.user.user_type == 'parent':
        messages = Message.objects.filter(sender=request.user) | Message.objects.filter(receiver=request.user)
    else:
        messages = Message.objects.none()
    return render(request, 'message_list.html', {'messages': messages})

# View to create a message
@login_required
def create_message(request):
    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.sender = request.user  # Automatically set the sender as the logged-in user
            message.save()
            return redirect('message_list')
    else:
        form = MessageForm()
    return render(request, 'create_message.html', {'form': form})

# View for student progress reports
@login_required
def student_progress_list(request):
    if request.user.user_type == 'parent':
        progress_reports = StudentProgress.objects.filter(student=request.user)
    elif request.user.user_type == 'teacher':
        progress_reports = StudentProgress.objects.all()
    else:
        progress_reports = StudentProgress.objects.none()
    return render(request, 'student_progress_list.html', {'progress_reports': progress_reports})

# View for meetings
@login_required
def meeting_list(request):
    if request.user.user_type == 'teacher':
        meetings = Meeting.objects.filter(teacher=request.user)
    elif request.user.user_type == 'parent':
        meetings = Meeting.objects.filter(parent=request.user)
    else:
        meetings = Meeting.objects.none()
    return render(request, 'meeting_list.html', {'meetings': meetings})

# View to create a meeting
@login_required
def create_meeting(request):
    if request.user.user_type != 'teacher':
        raise PermissionDenied
    if request.method == 'POST':
        parent_id = request.POST.get('parent_id')
        agenda = request.POST.get('agenda')
        scheduled_time = request.POST.get('scheduled_time')
        parent = get_object_or_404(User, id=parent_id, user_type='parent')
        Meeting.objects.create(teacher=request.user, parent=parent, agenda=agenda, scheduled_time=scheduled_time)
        return redirect('meeting_list')
    parents = User.objects.filter(user_type='parent')
    return render(request, 'create_meeting.html', {'parents': parents})

# Login view
def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

class ProgressView(View):
    def get(self, request):
        return JsonResponse({'progress': 50})


def index(request):
    return render(request, 'index.html')  # Indented properly


