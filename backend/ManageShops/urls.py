from django.contrib import admin
from django.urls import path, include
from .views import Products_all_view

urlpatterns = [
    path('products', Products_all_view.as_view(), name="products"),
    
]