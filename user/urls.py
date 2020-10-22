from django.contrib import admin
from django.urls import path,include
from .views import (getprofile,profileedit,GoogleLogin,getuserpoints)


urlpatterns = [
    path('profile/', getprofile.as_view({'get': 'list'})),
    path('editprofile/', profileedit.as_view()),
    path('googleLogin/',GoogleLogin.as_view(),name='socialaccount_signup'),
    path('getuserpoints/',getuserpoints.as_view())

]
