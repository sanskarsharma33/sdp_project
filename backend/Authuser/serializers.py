from rest_framework import serializers
from .models import User,Customers,Venders,Address

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone', 'is_vender']

    def create(self, validated_data):
        user= User.objects.create(**validated_data)
        user.set_password(validated_data.get('password'))
        user.save()
        return user

class UserSigninSerializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    password = serializers.CharField(required = True)

class CustomerSerializer(serializers.ModelSerializer):

    user = UserSerializer(required=True)

    class Meta:
        model = Customers
        fields = ('user', 'is_special')

    def create(self, validated_data):
        user = UserSerializer.create(UserSerializer(),validated_data=validated_data.pop('user'))
        customer = Customers.objects.create(user=user,is_special=validated_data.pop('is_special'))
        return customer

    # Testing Pending
    def update(self, instance, validated_data):
        instance.shop_name = validated_data.get('shop_name', instance.shop_name)
        instance.address = validated_data.get('address', instance.address)
        instance.location_long = validated_data.get('location_long', instance.location_long)
        instance.location_lat = validated_data.get('location_lat', instance.location_lat)
        instance.pincode = validated_data.get('pincode', instance.pincode)
        instance.cod_available = validated_data.get('cod_available', instance.cod_available)
        instance.transaction_id = validated_data.get('transaction_id', instance.transaction_id)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.save()
        return instance



class VenderSerializer(serializers.ModelSerializer):

    user = UserSerializer(required=True)

    class Meta:
        model = Venders
        fields = '__all__'

    def create(self, validated_data):
        user = UserSerializer.create(UserSerializer(),validated_data=validated_data.pop('user'))
        vender = Venders.objects.create(user=user,**validated_data)
        return vender


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
