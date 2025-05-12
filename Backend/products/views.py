from django.shortcuts import render
from django.http import JsonResponse
from .models import Product
# Create your views here.
def productspage(request):
    return render(request,"products.html")

def submitProductpage(request):
    vehicleimage=request.FILES['vehicleimg']
    modelname=request.POST.get('modelname')
    description=request.POST.get('description')
    qty=request.POST.get('qty')
    appointmentdate=request.POST.get('aptdate')
    location=request.POST.get("location")
    slot=request.POST.get('slot')
    purpose=request.POST.get('purpose')
    message=request.POST.get('message')
    user=request.user

    data=Product.objects.create(
        vehicleimage=vehicleimage,modelname=modelname,user=user,description
        =description,qty=qty,appointmentdate=appointmentdate,slot=slot,location=location,purpose=purpose,message=message
    )

    print(data)

    return JsonResponse({
        'response'  : 200
    })