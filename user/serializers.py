from rest_framework import serializers
from .models import User
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from rest_framework.authtoken.models import Token

class string(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return data




class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','email','id','avatar']


class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=User
        fields=['username','email','id','password','avatar','is_superuser','is_staff','points']
    

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['avatar']

class UserRegisterationSerializer(RegisterSerializer):
    username=serializers.CharField()
   
    class Meta:
        model=User
        fields=['username','email','password']

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
           
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.username=self.cleaned_data.get('username')
        user.save()
        adapter.save_user(request, user, self)

        return user

class TokenSerializer(serializers.ModelSerializer):
    username=serializers.SerializerMethodField()
    avatar=serializers.SerializerMethodField()
    points=serializers.SerializerMethodField()
    class Meta:
        model=Token
        fields=('key','user','username','avatar','points')
    def get_username(self,obj):
        serializer_data=UserSerializer(obj.user).data
        if(serializer_data.get('username') == ''):
            username=serializer_data.get('first_name')
            return username
        else:    
            username=serializer_data.get('username')
            return username
    def get_avatar(self,obj):
        serializer_data=UserSerializer(obj.user).data
        ava=serializer_data.get('avatar')
        avatar=f'http://127.0.0.1:8000{ava}'
        return avatar
    def get_points(self,obj):
        serializer_data=UserSerializer(obj.user).data
        points=serializer_data.get('points')
        return points
     