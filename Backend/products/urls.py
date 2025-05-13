from django.urls import path
from products import views

urlpatterns = [
    path("products",views.productspage,name="products"),
    path("api/submitproduct",views.submitProductpage,name="submitproduct"),    
    path("api/show-product",views.showproducts,name="show-product")
]

# {
#   "key": "alt+d",
#   "command": "editor.action.duplicateSelection",
#   "when": "editorTextFocus"
# }