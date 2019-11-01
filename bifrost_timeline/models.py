from django.db import models


# Create your models here.
class Timeline(models.Model):
    title = models.TextField(max_length=255)
    starting_date = models.DateTimeField()
    ending_date = models.DateTimeField()
    # Add refrence to a user.
