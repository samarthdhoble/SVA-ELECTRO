from django.shortcuts import render,redirect
from django.contrib.auth import get_user_model,authenticate,login
from django.http import JsonResponse
from .models import *
User = get_user_model()

# Create your views here.
def home(request):
    return render(request,"index.html")

def loginuser(request):
    return render(request,"login.html")

def registeruseraction(request,id):
    def check():
        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)  
            return JsonResponse({
                'msg' : "ok"
            }) # replace with your dashboard/home url
        else:
            return JsonResponse({
                'msg' : "error"
            })

    if id == 1:
        if request.method == "POST":
            email=request.POST.get("email")
            fullname=request.POST.get("fullname")
            phonenumber=request.POST.get("phonenumber")
            password=request.POST.get("password")
            print(id)
            user=User.objects.create_user(email=email,password=password,phonenumber=phonenumber)    
            Client.objects.create(login=user,fullname=fullname,phone_number=phonenumber)
            check()
            return redirect("/product")

        elif id == 2:
            if request.method == "POST":
                email=request.POST.get("email")
                name=request.POST.get("fullname")
                registration_no=request.POST.get("registration_no")
                phonenumber=request.POST.get("phonenumber")
                address=request.POST.get("address")
                password=request.POST.get("password")

                User.objects.create_user(email=email,password=password,phonenumber=phonenumber)
                user=User.objects.create_user(email=email,password=password,phonenumber=phonenumber)    
                PrivateBussines.objects.create(login=user,business_name=name,address=address,registration_no=registration_no,phone_number=phonenumber)
                check()
                return redirect("/product")

            
        else:
            if request.method == "POST":
                email=request.POST.get("email")
                name=request.POST.get("fullname")
                code=request.POST.get("code")
                password=request.POST.get("password")

                User.objects.create_user(email=email,password=password,phonenumber=phonenumber)
                user=User.objects.create_user(email=email,password=password,phonenumber=phonenumber)    
                GovernmentDetails.objects.create(login=user,department=name,gov_id=code)
                check()
                return redirect("/product")

            