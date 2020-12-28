from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Products

router = DefaultRouter()
router.register(r'products', Products)

urlpatterns = [
    path('', include(router.urls)),
    
]