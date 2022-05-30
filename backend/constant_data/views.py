from django.shortcuts import render
from rest_framework import viewsets
from .models import City, SupplementaryInsurance
from .serializers import CitySerializer, SupplementaryInsuranceSerializer


class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class SupplementaryInsuranceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SupplementaryInsurance.objects.all()
    serializer_class = SupplementaryInsuranceSerializer
