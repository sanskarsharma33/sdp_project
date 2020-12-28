from django.contrib import admin
from .models import User,Customers,Venders

# Register your models here.
admin.site.register(User)
admin.site.register(Customers)
admin.site.register(Venders)