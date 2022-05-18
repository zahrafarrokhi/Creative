from datetime import timedelta

from django.conf import settings
from django.test.signals import setting_changed
from django.utils.translation import gettext_lazy as _
from rest_framework.settings import APISettings as _APISettings
from django.utils.text import Truncator, format_lazy
from django.utils.translation import gettext_lazy as _


USER_SETTINGS = getattr(settings, 'AUTHENTICATION_SETTINGS', None)

DEFAULTS = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=60),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': settings.SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'unique_id',

    'AUTH_TOKEN_CLASSES': ('authentication.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=30),

    # Passwordless
    'OTP_EXPIRE_TIME': 60 * 2,
    'OTP_LENGTH': 6,
    # Allowed auth types, can be EMAIL, SMS, or both.
    'OTP_AUTH_TYPES': ['EMAIL'],

    # URL Prefix for Authentication Endpoints
    'OTP_AUTH_PREFIX': 'auth/',

    #  URL Prefix for Verification Endpoints
    'OTP_VERIFY_PREFIX': 'auth/verify/',

    # The user's email field name
    'OTP_USER_EMAIL_FIELD_NAME': 'email',

    # The user's mobile field name
    'OTP_USER_SMS_FIELD_NAME': 'sms',

    # Marks itself as verified the first time a user completes auth via token.
    # Automatically unmarks itself if email is changed.
    'OTP_USER_MARK_EMAIL_VERIFIED': False,
    'OTP_USER_EMAIL_VERIFIED_FIELD_NAME': 'email_verified',

    # Marks itself as verified the first time a user completes auth via token.
    # Automatically unmarks itself if mobile number is changed.
    'OTP_USER_MARK_SMS_VERIFIED': False,
    'OTP_USER_SMS_VERIFIED_FIELD_NAME': 'sms_verified',

    # The email the callback token is sent from
    'OTP_EMAIL_NOREPLY_ADDRESS': None,

    # The email subject
    'OTP_EMAIL_SUBJECT': _("Your Login Token"),

    # A plaintext email message overridden by the html message. Takes one string.
    'OTP_EMAIL_PLAINTEXT_MESSAGE': _("Enter this token to sign in: %s"),

    # The email template name.
    'OTP_EMAIL_TOKEN_HTML_TEMPLATE_NAME': "passwordless_default_token_email.html",

    # Your twilio number that sends the callback tokens.
    'OTP_SMS_NOREPLY_NUMBER': None,

    # The message sent to mobile users logging in. Takes one string.
    'OTP_SMS_MESSAGE': _("Use this code to log in: %s"),

    # Registers previously unseen aliases as new users.
    'OTP_REGISTER_NEW_USERS': True,

    # Suppresses actual SMS for testing
    'OTP_TEST_SUPPRESSION': False,

    # Context Processors for Email Template
    'OTP_CONTEXT_PROCESSORS': [],

    # The verification email subject
    'OTP_EMAIL_VERIFICATION_SUBJECT': _("Your Verification Token"),

    # A plaintext verification email message overridden by the html message. Takes one string.
    'OTP_EMAIL_VERIFICATION_PLAINTEXT_MESSAGE': _("Enter this verification code: %s"),

    # The verification email template name.
    'OTP_EMAIL_VERIFICATION_TOKEN_HTML_TEMPLATE_NAME': "passwordless_default_verification_token_email.html",

    # The message sent to mobile users logging in. Takes one string.
    'OTP_SMS_VERIFICATION_MESSAGE': _("Enter this verification code: %s"),

    # Automatically send verification email or sms when a user changes their alias.
    'OTP_AUTO_SEND_VERIFICATION_TOKEN': False,

    # What function is called to construct an authentication tokens when
    # exchanging a passwordless token for a real user auth token.
    'OTP_AUTH_TOKEN_CREATOR': 'drfpasswordless.utils.create_authentication_token',

    # What function is called to construct a serializer for drf tokens when
    # exchanging a passwordless token for a real user auth token.
    'OTP_AUTH_TOKEN_SERIALIZER': 'drfpasswordless.serializers.TokenResponseSerializer',

    # A dictionary of demo user's primary key mapped to their static pin
    'OTP_DEMO_USERS': {},
    'OTP_EMAIL_CALLBACK': 'drfpasswordless.utils.send_email_with_callback_token',
    'OTP_SMS_CALLBACK': 'drfpasswordless.utils.send_sms_with_callback_token',

    # Token Generation Retry Count
    'OTP_TOKEN_GENERATION_ATTEMPTS': 36,
}

IMPORT_STRINGS = (
    'AUTH_TOKEN_CLASSES',
    'TOKEN_USER_CLASS',
    'USER_AUTHENTICATION_RULE',
)

REMOVED_SETTINGS = (
    'AUTH_HEADER_TYPE',
    'AUTH_TOKEN_CLASS',
    'SECRET_KEY',
    'TOKEN_BACKEND_CLASS',
)


class APISettings(_APISettings):  # pragma: no cover
    def __check_user_settings(self, user_settings):
        SETTINGS_DOC = 'https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html'

        for setting in REMOVED_SETTINGS:
            if setting in user_settings:
                raise RuntimeError(format_lazy(
                    _("The '{}' setting has been removed. Please refer to '{}' for available settings."),
                    setting, SETTINGS_DOC,
                ))

        return user_settings


api_settings = APISettings(USER_SETTINGS, DEFAULTS, IMPORT_STRINGS)


def reload_api_settings(*args, **kwargs):  # pragma: no cover
    global api_settings

    setting, value = kwargs['setting'], kwargs['value']

    if setting == 'AUTHENTICATION_SETTINGS':
        api_settings = APISettings(value, DEFAULTS, IMPORT_STRINGS)


setting_changed.connect(reload_api_settings)
