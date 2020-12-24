# Django
from django.shortcuts import render
from django.contrib.auth import authenticate

# Rest Framework
from rest_framework import status, generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
)

# Custom
from Authuser.serializers import UserSerializer, VendorSerializer, AddressSerializer
from Authuser.models import Vendors, Customers, User, Address
from Authuser.permissions import IsOwner
from Authuser.authentication import expires_in, is_token_expired, token_expire_handler
# Create your views here.


@api_view(['POST', ])
def customer_registration_view(request):
    if request.data['is_vendor']:
        raise serializers.ValidationError(
            {'error': 'Customer cannot be Vendor'})
    serializer = UserSerializer(data=request.data)
    if User.objects.filter(email=request.data['email']).exists():
        raise serializers.ValidationError({'user': 'User already Exist'})
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        customer = Customers(
            user=user,
            is_special=False
        )
        customer.save()
        data['response'] = "Succesfully registered Customer"
        data['username'] = user.username
        data['email'] = user.email
        token = Token.objects.get(user=user).key
        data['token'] = token
    else:
        data = serializer.errors
    return Response(data)


@api_view(['POST', ])
def vendor_registration_view(request):
    serializer = UserSerializer(data=request.data)
    serializer1 = VendorSerializer(data=request.data)
    if User.objects.filter(email=request.data['email']).exists():
        raise serializers.ValidationError({'error': 'User already Exist'})
    data = {}
    if serializer.is_valid():
        if serializer1.is_valid():
            user = serializer.save()
            vendor = serializer1.save()
            vendor.user = user
            vendor.save()
            data['response'] = "Succesfully registered Vendor"
            data['shop_name'] = vendor.shop_name
            data['username'] = user.username
            data['email'] = user.email
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = serializer1.errors
    else:
        data = serializer.errors
    return Response(data)


@api_view(["POST"])
@permission_classes((AllowAny,))
def signin_view(request):

    user = authenticate(
        username=request.data['username'],
        password=request.data['password']
    )
    if not user:
        return Response({'detail': 'Invalid Credentials or activate account'}, status=HTTP_404_NOT_FOUND)

    # TOKEN STUFF
    token, _ = Token.objects.get_or_create(user=user)

    # token_expire_handler will check, if the token is expired it will generate new one
    is_expired, token = token_expire_handler(token)
    user_serialized = UserSerializer(user)
    user_serialized.fields.pop('password')

    return Response({
        'user': user_serialized.data,
        'expires_in': expires_in(token),
        'token': token.key
    }, status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def logout(request):
    Token.delete(request.data['token'])
    return Response({
        'message': 'Logged Out successfully'
    }, status=HTTP_200_OK)


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,
                          IsOwner]


"""
class AddressDetail(APIView):

    def get_object(self, pk):
        try:
            address = Address.objects.get(pk=pk)
            if address.user == request.user:
                return address
            else:
                return None
        except Snippet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        address = self.get_object(pk)
        if address != None:
            serializer = AddressSerializer(address)
        else:
            return Response({'error': 'Bad Request'}, 400)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        address = self.get_object(pk)
        serializer = AddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        address = self.get_object(pk)
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AddressList(APIView):
    
    
    def get(self, request, format=None):
        address = Address.objects.all()
        serializer = AddressSerializer(address, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
