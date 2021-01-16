from rest_framework import serializers
from .models import (Products, ProductImage)
from Authuser.models import User
from Authuser.serializers import VendorSerializer

class ProductSerializer(serializers.ModelSerializer):

    image = serializers.SerializerMethodField()
    class Meta:
        model = Products
        # fields = '__all__'
        fields = ['id','title','catagory','amount','discount','quantity','details', 'image']

    def get_image(self, obj):
        img_set = obj.productimage_set.all()
        if(len(img_set)!=0):
            imgs_url = []
            for img in img_set:
                imgs_url.append(img.image.url)
            return imgs_url
        return []

    # def create(self, validated_data):
    #     return Products.objects.create(** validated_data)

    # def update(self, instance, validated_data):
    #     instance.title = validated_data.get('title',instance.title)
    #     instance.catagory = validated_data.get('catagory',instance.catagory)
    #     instance.amount = validated_data.get('amount',instance.amount)
    #     instance.quantity = validated_data.get('quantity',instance.quantity)
    #     instance.discount = validated_data.get('discount',instance.discount)
    #     instance.details = validated_data.get('details',instance.details)

class ProductImageSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField('get_image_url')

    class Meta:
        model = ProductImage
        fields = ['image','id', 'image_url']

    def get_image_url(self, obj):
        return obj.image.url