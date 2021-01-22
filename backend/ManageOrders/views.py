# Django
from django.shortcuts import render

# Rest Framework
from rest_framework import generics, viewsets, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED
)

# Custom
from .permissions import IsCartOwner
from .models import Orders, CartDetails as CartDetailsModel, ProductOrder
from .serializers import CartDetailsSerializer, CartDetailsViewSerializer
from ManageShops.serializers import ProductSerializer
from ManageShops.models import Products


class CartDetails(viewsets.ModelViewSet):

    queryset = CartDetailsModel.objects.all()
    serializer_class = CartDetailsSerializer
    permission_classes = [IsAuthenticated, IsCartOwner]

    def get_serializer_class(self):
        if self.action == 'list':
            return CartDetailsViewSerializer
        if self.action == 'retrieve':
            return CartDetailsViewSerializer
        return CartDetailsSerializer


    def get_queryset(self):
        owner_queryset = self.queryset.filter(customer=self.request.user.customers)
        return owner_queryset


    def perform_create(self, serializer):
        product = Products.objects.get(pk=self.request.data['pid'])
        serializer.save(customer=self.request.user.customers, product=product)