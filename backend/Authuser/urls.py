from django.contrib import admin
from django.urls import path,include
from . import views
from rest_framework.authtoken import views as tokenviews

urlpatterns = [
    path('register/', views.registration_view, name='registration'),
    path('signin/', views.signin_view, name='signin'),
    path('check/', views.check, name='check'),
]