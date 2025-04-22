from django.urls import path
from CustomUserModelApp import views

urlpatterns = [
    path("",views.home,name="home"),
    path("login",views.loginuser,name="login"),
    path("login/user/<int:id>",views.loginuseraction,name="login")

]

