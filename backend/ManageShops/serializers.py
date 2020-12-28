from rest_framework import serializers
from .models import (Products, ProductImage)
from Authuser.models import User

class ProductSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Products
        fields = '__all__'  

    def create(self, validated_data):
        return Products.objects.create(** validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title',instance.title)
        instance.catagory = validated_data.get('catagory',instance.catagory)
        instance.vender = validated_data.get('vender',instance.vender)
        instance.amount = validated_data.get('amount',instance.amount)
        instance.quantity = validated_data.get('quantity',instance.quantity)
        instance.discount = validated_data.get('discount',instance.discount)
        instance.details = validated_data.get('details',instance.details)