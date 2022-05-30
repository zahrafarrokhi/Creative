from django.db import models


class City(models.Model):
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True,
                               null=True)
    name = models.CharField(max_length=32)
    fa_name = models.CharField(max_length=32)

    def __str__(self):
        return self.fa_name


class SupplementaryInsurance(models.Model):
    name = models.CharField(max_length=32)
    fa_name = models.CharField(max_length=32)

    def __str__(self):
        return self.fa_name
