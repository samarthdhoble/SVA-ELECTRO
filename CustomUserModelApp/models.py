from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from .manager import CustomUserManager

class CustomUser(AbstractUser):
    email=models.EmailField(unique=True)
    fullname=models.CharField(max_length=100,blank=False)
    phonenumber=models.CharField(max_length=10,unique=True)


    USERNAME_FIELD = 'email'  # This should match the unique identifier for your user
    REQUIRED_FIELDS = ['phonenumber', 'fullname']  # Fields required for superuser creation

    objects = CustomUserManager()
