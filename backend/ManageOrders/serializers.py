from rest_framework import serializers
from .models import (CartDetails, ProductOrder, Orders)
from Authuser.models import User
from Authuser.serializers import VendorSerializer
from ManageShops.serializers import ProductViewSerializer

class CartDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartDetails
        fields = ['quantity','added_date']

class CartDetailsViewSerializer(serializers.ModelSerializer):

    product = serializers.SerializerMethodField()
    class Meta:
        model = CartDetails
        fields = ['id','quantity','added_date', 'product']

    def get_product(self, obj):
        product = ProductViewSerializer(obj.product).data
        return product
