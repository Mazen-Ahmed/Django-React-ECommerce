from django.db import models
from django.contrib.auth.models import AbstractUser
from backend import settings
from PIL import Image
class User(AbstractUser):
    points=models.FloatField(default=00.0)
    avatar=models.ImageField(default='default-user-icon.jpg',upload_to='pics')
    def __str__(self):
        return self.username

    