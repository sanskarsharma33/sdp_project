# Generated by Django 3.0.6 on 2021-01-23 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ManageShops', '0003_products_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='catagory',
            field=models.CharField(max_length=100),
        ),
    ]
