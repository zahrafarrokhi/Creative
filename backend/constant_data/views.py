from django.shortcuts import render
from rest_framework import viewsets
from .models import City, SupplementaryInsurance
from .serializers import CitySerializer, SupplementaryInsuranceSerializer
"""
class ReadOnlyModelViewSet(mixins.RetrieveModelMixin,
                           mixins.ListModelMixin,
                           GenericViewSet):
  
    pass
 ReadOnlyModelViewSet => has list but  queryset = City.objects.all() doesn't mater check permission for list, 
            meaning that anyone can/should view these items, so we don't need any specific permission defined 
"""
class CityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class SupplementaryInsuranceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SupplementaryInsurance.objects.all()
    serializer_class = SupplementaryInsuranceSerializer
