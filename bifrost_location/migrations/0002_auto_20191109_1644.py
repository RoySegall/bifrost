# Generated by Django 2.2.6 on 2019-11-09 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bifrost_location', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='location',
            name='geolocation',
        ),
        migrations.AddField(
            model_name='location',
            name='lat',
            field=models.DecimalField(decimal_places=10, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='long',
            field=models.DecimalField(decimal_places=10, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='location',
            name='address',
            field=models.CharField(max_length=255),
        ),
    ]
