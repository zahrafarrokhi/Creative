from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework_gis.fields import GeometryField
from django.utils.translation import gettext_lazy as _
from .models import Patient, Address
from constant_data.models import City
from constant_data.serializers import SupplementaryInsuranceSerializer
from django.conf import settings
import datetime


class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = '__all__'
        read_only_fields = ['user']
        extra_kwargs = {'first_name': {'required': False}, 'last_name': {
            'required': False}, 'gender': {'required': False}}

    def validate(self, data):
        print(data)
        if len(data.get('national_id', '')) != 10:
            print(data.get('national_id', ''),
                  len(data.get('national_id', '')))
            msg = _("Invalid national id")
            raise serializers.ValidationError(msg)

        try:
            data['org_date_of_birth'] = data.get('date_of_birth')
            if isinstance(data['date_of_birth'], str):
                data['date_of_birth'] = datetime.datetime.strptime(
                    data.get('date_of_birth'),
                    '%Y-%m-%d').date()
        except ValueError:
            msg = _("Invalid birthday")
            raise serializers.ValidationError(msg)

        return data

    def update(self, instance, validated_data):
       # except national_id and date_of_birth
        instance.city = validated_data.get(
            'city', instance.city)
        instance.first_name = validated_data.get(
            'first_name', instance.first_name)
        instance.last_name = validated_data.get(
            'last_name', instance.last_name)
        instance.gender = validated_data.get(
            'gender', instance.gender)
        instance.insurance = validated_data.get(
            'insurance', instance.insurance)
        instance.supplementary_insurance = validated_data.get(
            'supplementary_insurance', instance.supplementary_insurance)
        instance.save()
        return instance

    def create(self, validated_data):
        user = self.context['request'].user

        # sample = PATIENTS.get(
        #     validated_data['national_id'], DEF_DATA)
        # validated_data['first_name'] = sample['first_name']
        # validated_data['last_name'] = sample['last_name']
        # validated_data['gender'] = sample['gender']
        patient = Patient(
            user=user,
            national_id=validated_data.get('national_id'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            date_of_birth=validated_data.get('date_of_birth'),
            date_of_birth_jalali=validated_data.get('date_of_birth_jalali'),
            gender=validated_data.get('gender'),
            city=validated_data.get('city'),
        )

        patient.save()
        return patient


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        geo_field = "location"
        fields = '__all__'
        read_only_fields = ['user']

    def create(self, validated_data):
        user = self.context['request'].user
        address = Address(
            user=user,
            **validated_data)
        address.save()
        return address
