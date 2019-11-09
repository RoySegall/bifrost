from django.db import models


class Location(models.Model):
    title = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    lat = models.FloatField(null=True)
    long = models.FloatField(null=True)

    class Meta:
        unique_together = ['lat', 'long']

    def __str__(self):
        return self.title

