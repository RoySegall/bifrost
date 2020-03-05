from django.db import models
from django.contrib.auth.models import User


class Timeline(models.Model):
    title = models.CharField(max_length=255)
    starting_date = models.DateTimeField()
    ending_date = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title

