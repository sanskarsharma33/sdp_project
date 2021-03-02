# Django
from django.shortcuts import render

# Rest Framework
from rest_framework import generics, viewsets, views
from rest_framework.decorators import api_view, permission_classes
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
from .models import Orders as OrdersModel, CartDetails as CartDetailsModel, ProductOrder
from .serializers import CartDetailsSerializer, CartDetailsViewSerializer, OrderSerializer, OrderViewSerializer
from ManageShops.serializers import ProductSerializer
from ManageShops.models import Products
from Authuser.models import User, Address
import stripe


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
        owner_queryset = self.queryset.filter(
            customer=self.request.user.customers)
        return owner_queryset

    def perform_create(self, serializer):
        product = Products.objects.get(pk=self.request.data['pid'])
        serializer.save(customer=self.request.user.customers, product=product)


class Orders(viewsets.ModelViewSet):

    queryset = OrdersModel.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated, ]

    def get_serializer_class(self):
        if self.action == 'list':
            return OrderViewSerializer
        if self.action == 'retrieve':
            return OrderViewSerializer
        return OrderSerializer

    def get_queryset(self):
        owner_queryset = self.queryset.filter(
            customer=self.request.user.customers)
        return owner_queryset

    def perform_create(self, serializer):
        address = Address.objects.get(pk=self.request.data['aid'])
        serializer.save(address=address, customer=self.request.user.customers)


@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
def charge(request):
    stripe.api_key = "sk_test_51IMU9iAVVA7u04DhTZCgkKKYw3D30JnMPJOIVaOiDfu53GA4dJ77BZenfHV8odee1wZaWb78iTyyVZOknAUfzgOo006R5IS19o"

    customer = stripe.Customer.create(
        email=request.data['email'],
        name=request.data['email'],
        source=request.data['stripeToken']
    )
    charge = stripe.Charge.create(
        customer=customer,
        amount=int(request.data['amount'])*100,
        currency='inr',
        description='order'
    )
    return Response(charge)
