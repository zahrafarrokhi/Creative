from .settings import api_settings
from django.urls import path
from .views import (
    ObtainMobileCallbackToken,
    ObtainEmailCallbackToken,
    TokenObtainPairView,
    TokenRefreshView
)

app_name = 'authentication'

urlpatterns = [
    path('mobile/', ObtainMobileCallbackToken.as_view(), name="mobile_login"),
    path('email/', ObtainEmailCallbackToken.as_view(), name="email_login"),
    path('confirm/', TokenObtainPairView.as_view(), name="confirm_code"),
    path('refresh/', TokenRefreshView.as_view(), name="refresh_token"),
]
