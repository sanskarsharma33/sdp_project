from django.shortcuts import render
from .models import Products, ProductImage
from .serializers import ProductSerializer
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from backend.permissions import IsOwner

# Create your views here.

class Products(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsOwner,]

    def get_queryset(self):
        # after get all products on DB it will be filtered by its owner and return the queryset
        owner_queryset = self.queryset.filter(user=self.request.user)
        return owner_queryset

    def perform_create(self, serializer):
        # when a product is saved, its saved how it is the owner
        serializer.save(user=self.request.user)
