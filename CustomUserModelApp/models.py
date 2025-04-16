from django.conf import  settings
from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
from .manager import CustomUserManager

class CustomUser(AbstractUser):
    username=None
    email=models.EmailField(unique=True)
    phonenumber=models.CharField(max_length=10,unique=True)


    USERNAME_FIELD = 'email'  # This should match the unique identifier for your user
    REQUIRED_FIELDS = ['phonenumber']  # Fields required for superuser creation

    objects = CustomUserManager()

class GovernmentDetails(models.Model):
    login = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    department=models.CharField(max_length=122)
    gov_id=models.CharField(max_length=122)

class PrivateBussines(models.Model):
    login = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    business_name=models.CharField(max_length=122)
    registration_no=models.IntegerField(blank=False)
    phone_number=models.CharField(max_length=10,unique=True)
    address=models.TextField()

class Client(models.Model):
    login = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fullname=models.CharField(max_length=122)
    phone_number=models.CharField(max_length=10,unique=True)
    


#     email
#     password
#     -------->
#             B2B
#             B2C
#             B2G
