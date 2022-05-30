from django.urls import include, path
from rest_framework import routers
from constant_data import views

router = routers.DefaultRouter()

router.register(r'city', views.CityViewSet, basename='city')
router.register(r'insurance', views.SupplementaryInsuranceViewSet, basename='insurance')

urlpatterns = [
    path('', include(router.urls)),
]
