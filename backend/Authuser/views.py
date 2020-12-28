from django.shortcuts import render
from .serializers import UserSerializer, UserSigninSerializer, VenderSerializer, CustomerSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import User, Customers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from .authentication import token_expire_handler, expires_in
from django.contrib.auth import authenticate
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
)

# Create your views here.

#View for register requested user
@permission_classes((AllowAny,)) 
@api_view(['POST',])
def registration_view(request):
    data = {}
    if request.data['user']['is_vender'] :
        vender_serializer = VenderSerializer(data=request.data)

        if vender_serializer.is_valid(raise_exception=ValueError):
            vender_serializer.create(validated_data=request.data)
        else:
            return Response(vender_serializer.error_messages,status=HTTP_400_BAD_REQUEST)

    else:
        customer_serializer = CustomerSerializer(data=request.data)

        if customer_serializer.is_valid(raise_exception=ValueError):
            customer_serializer.create(validated_data=request.data)
        else:
            return Response(customer_serializer.error_messages,status=HTTP_400_BAD_REQUEST)
    data['response'] = status.HTTP_201_CREATED
    
    return Response(data)


#View for authenticate requested user
@api_view(["POST"])
@permission_classes((AllowAny,)) 
def signin_view(request):
    signin_serializer = UserSigninSerializer(data = request.data)
    if not signin_serializer.is_valid():
        return Response(signin_serializer.errors, status = HTTP_400_BAD_REQUEST)

    user = authenticate(
            username = signin_serializer.data['username'],
            password = signin_serializer.data['password'] 
        )
    if not user:
        return Response({'detail': 'Invalid Credentials or activate account'}, status=HTTP_404_NOT_FOUND)
        
    #TOKEN STUFF
    token, _ = Token.objects.get_or_create(user = user)
    
    #token_expire_handler will check, if the token is expired it will generate new one
    is_expired, token = token_expire_handler(token)   
    user_serialized = UserSerializer(user)
    user_serialized.fields.pop('password')

    return Response({
        'user': user_serialized.data, 
        'expires_in': expires_in(token),
        'token': token.key
    }, status=HTTP_200_OK)



@api_view(["POST"])
def check(request):

    user = User.objects.get(username='kk17')
    # s = UserSerializer(user,many=True)
    print(user.venders.shop_name)
    return Response("Hey")