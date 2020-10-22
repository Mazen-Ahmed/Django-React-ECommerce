from django.shortcuts import render
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView,RetrieveAPIView,UpdateAPIView
from rest_framework import viewsets
from .serializers import UserSerializer,UserUpdateSerializer
import random

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = 'http://localhost:8000/accounts/google/login/callback/'

class getprofile(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.action == 'list':
            return self.queryset.filter(username=self.request.user)
        return self.queryset


class profileedit(APIView):
    def post(self,request):
        token=request.data.get('token',None)
        avatar=request.data.get('avatar',None)
        print(avatar)
        user=Token.objects.get(key=token).user
        user.avatar=avatar
        user.save()
        return Response('ok') 

class getuserpoints(APIView):
    def get(self,request):
        token=request.META.get('HTTP_TOKEN',None)
        user=Token.objects.get(key=token).user
        return Response(round(user.points,2))