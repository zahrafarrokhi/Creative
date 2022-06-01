from django.shortcuts import render, get_list_or_404
from patients import models, serializers
from rest_framework import generics, status
from rest_framework.response import Response
from base_classes.permissions import IsOwner
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

DEF_DATA = {
    'first_name': "---",
    'last_name': "---",
    'gender': '',
}
PATIENTS = {

    '1111111111': {
        'first_name': "زهرا",
        'last_name': "امیری",
        'gender': 'f',
    },

    '1234567890': {
        'first_name': "فاطمه",
        'last_name': "رادین",
        'gender': 'f',
    },
    '1234567891': {
        'first_name': "علی",
        'last_name': "احمدی",
        'gender': 'm',
    },
    '1234567892': {
        'first_name': "شادی",
        'last_name': "مدیری",
        'gender': 'm',
    },
    '1234567893': {
        'first_name': "هدیه",
        'last_name': "راد",
        'gender': 'f',
    },

}


class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PatientSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        data = {}
        sample = PATIENTS.get(
            serializer.validated_data['national_id'], DEF_DATA)
        data['first_name'] = sample['first_name']
        data['last_name'] = sample['last_name']
        data['gender'] = sample['gender']
        serializer.save(**data)

    def get_queryset(self):
        return models.Patient.objects.filter(user=self.request.user)


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AddressSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return models.Address.objects.filter(user=self.request.user)
