# Generated by Django 3.0.6 on 2021-01-21 20:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ManageReviews', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reviews',
            old_name='discription',
            new_name='description',
        ),
    ]
