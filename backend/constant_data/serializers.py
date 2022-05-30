from rest_framework import serializers

from .models import City, SupplementaryInsurance


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class SupplementaryInsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplementaryInsurance
        fields = '__all__'
