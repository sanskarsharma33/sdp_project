from django.contrib import admin
from django.urls import path, include
import epicbox
from Authuser import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'address', views.AddressViewSet)

urlpatterns = [
    path('customer/register', views.customer_registration_view,
         name="customer_register"),
    path('signin', views.signin_view, name="signin"),
    path('vendor/register', views.vendor_registration_view, name="vendor_register"),
    path('vendors/all', views.get_all_vendors.as_view(), name="get_all_vendors"),
    path('logout', views.logout, name="logout"),
    path('customer/update', views.customer_update_view, name="customer_update"),
    path('vendor/update', views.vendor_update_view, name="vendor_update"),
    path('change-password/', views.ChangePasswordView.as_view(),
         name='change-password'),
    path('password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('get_user', views.get_user, name="get_user"),
    path('get_vendor', views.get_vendor, name="get_vendor"),
    path('', include(router.urls)),
]
