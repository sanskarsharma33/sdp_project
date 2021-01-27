from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CartDetails

router = DefaultRouter()
router.register(r'cart', CartDetails)
# router.register(r'productimage', ProductImage)

urlpatterns = [
    path('', include(router.urls)),
]
