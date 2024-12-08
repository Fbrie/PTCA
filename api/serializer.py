from rest_framework import serializers
from .models import User

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_teacher', 'is_parent', 'user_type', 'bio')

# Signup Serializer
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'is_teacher', 'is_parent', 'user_type')
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

