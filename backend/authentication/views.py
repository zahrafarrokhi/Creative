from django.utils.translation import gettext_lazy as _
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from . import serializers
from .authentication import AUTH_HEADER_TYPES
from .exceptions import InvalidToken, TokenError
from .models import OTP, User
from .services import TokenService
from .settings import api_settings


class BaseTokenObtainCallbackToken(generics.GenericAPIView):
    """
    This returns a N-digit callback token  we can trade for a user's Auth Token.
    """
    success_response = _("A login token has been sent to you.")
    failure_response = _("Unable to send you a login code. Try again later.")

    message_payload = {}

    @property
    def serializer_class(self):
        raise NotImplementedError

    @property
    def alias_type(self):
        raise NotImplementedError

    @property
    def token_type(self):
        raise NotImplementedError

    def post(self, request, *args, **kwargs):
        user: User = self.request.user
        if user.is_authenticated:
            if self.token_type == OTP.SMS:
                user.phone_number = request.data.get("phone_number")
                user.phone_number_verified = False
                user.save(force_update=True)
            elif self.token_type == OTP.EMAIL:
                user.email = request.data.get("email")
                user.email_verified = False
                user.save(force_update=True)
            else:
                return Response("bad token type", status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = self.serializer_class(data=request.data, context={'request': request})

            if serializer.is_valid(raise_exception=True):
                user = serializer.validated_data['user']

            else:
                return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)

        success = TokenService.send_token(user, self.alias_type, self.token_type,
                                          **self.message_payload)

        if success:
            status_code = status.HTTP_200_OK
            response_detail = self.success_response
        else:
            status_code = status.HTTP_400_BAD_REQUEST
            response_detail = self.failure_response

        return Response({'detail': response_detail}, status=status_code)


class ObtainMobileCallbackToken(BaseTokenObtainCallbackToken):
    permission_classes = (AllowAny,)
    serializer_class = serializers.MobileAuthSerializer
    success_response = _("A login token has been texted to you.")
    failure_response = _("Unable to text you a login code. Try again later.")

    alias_type = 'phone_number'
    token_type = OTP.SMS

    sms_message = api_settings.OTP_SMS_MESSAGE
    message_payload = {
        'sms_message': sms_message,
    }


class ObtainEmailCallbackToken(BaseTokenObtainCallbackToken):
    permission_classes = (AllowAny,)
    serializer_class = serializers.EmailAuthSerializer
    success_response = _("A login token has been sent to your email.")
    failure_response = _("Unable to email you a login code. Try again later.")

    alias_type = 'email'
    token_type = OTP.EMAIL

    email_subject = api_settings.OTP_EMAIL_SUBJECT
    email_plaintext = api_settings.OTP_EMAIL_PLAINTEXT_MESSAGE
    email_html = api_settings.OTP_EMAIL_TOKEN_HTML_TEMPLATE_NAME
    message_payload = {
        'email_subject': email_subject,
        'email_plaintext': email_plaintext,
        'email_html': email_html,
    }


class TokenViewBase(generics.GenericAPIView):
    permission_classes = ()
    authentication_classes = ()

    serializer_class = None

    www_authenticate_realm = 'api'

    def get_authenticate_header(self, request):
        return '{0} realm="{1}"'.format(AUTH_HEADER_TYPES[0],
                                        self.www.www_authenticate_realm)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class TokenObtainPairView(TokenViewBase):
    serializer_class = serializers.CallbackTokenSerializer


token_obtain_pair = TokenObtainPairView.as_view()


class TokenRefreshView(TokenViewBase):
    serializer_class = serializers.TokenRefreshSerializer


token_refresh = TokenRefreshView.as_view()


# class LogoutView(generics.GenericAPIView):
#     pass

