from django.db import models
from Authuser.models import Customers, Venders

# Create your models here.
class SpecialMembership(models.Model):
    customer = models.OneToOneField(Customers, on_delete=models.CASCADE)
    begin_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    end_date = models.DateTimeField()

class VendersMembership(models.Model):
    vender = models.OneToOneField(Venders, on_delete=models.CASCADE)
    begin_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    end_date = models.DateTimeField()