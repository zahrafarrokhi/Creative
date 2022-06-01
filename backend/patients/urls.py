from django.urls import include, path
from rest_framework import routers
from patients import views

router = routers.DefaultRouter()

router.register(r'patient', views.PatientViewSet, basename='patients')
router.register(r'address', views.AddressViewSet, basename='addresses')

urlpatterns = [
    path('', include(router.urls)),
]
