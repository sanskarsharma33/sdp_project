# Generated by Django 3.0.6 on 2021-01-21 18:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Authuser', '0001_initial'),
        ('ManageOrders', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartdetails',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Authuser.Customers'),
        ),
    ]