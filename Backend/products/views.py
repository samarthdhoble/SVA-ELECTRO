from django.shortcuts import render

# Create your views here.
def productspage(request):
    return render(request,"products.html")