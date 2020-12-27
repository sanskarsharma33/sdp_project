from django.shortcuts import render
from .models import Products, ProductImage
from .serializers import ProductSerializer
from rest_framework import generics

# Create your views here.

class Products_all_view(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer