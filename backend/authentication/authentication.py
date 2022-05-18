from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import HTTP_HEADER_ENCODING, authentication
from .settings import api_settings


from .exceptions import AuthenticationFailed, InvalidToken, TokenError

AUTH_HEADER_TYPES = api_settings.AUTH_HEADER_TYPES

if not isinstance(api_settings.AUTH_HEADER_TYPES, (list, tuple)):
    AUTH_HEADER_TYPES = (AUTH_HEADER_TYPES, )


AUTH_HEADER_TYPE_BYTES = set(
    h.encode(HTTP_HEADER_ENCODING)
    for h in AUTH_HEADER_TYPES
)


class JWTAuthentication(authentication.BaseAuthentication):
    """
    An authentication plugin that authenticateds requests through a JSON web token
    provided in a request header
    """
    www_authenticate_realm = 'api'
    media_type = 'application/json'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user_model = get_user_model()

    def authenticate(self, request):
        header = self.get_header(request)
        if header is None:
            return None

        raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)

        return self.get_user(validated_token), validated_token

    def authenticate_header(self, request):
        return '{0} realm="{1}"'.format(
            AUTH_HEADER_TYPES[0],
            self.www_authenticate_realm
        )

    def get_header(self, request):
        """
        Extracts the header containing the JWT from the given request
        """
        header = request.META.get(
            api_settings.AUTH_HEADER_NAME)

        if isinstance(header, str):
            header = header.encode(HTTP_HEADER_ENCODING)

        return header

    def get_raw_token(self, header):
        """
        Extracts an unvalidated JWT from the given "Authorization"
        header value.
        """
        parts = header.split()

        if len(parts) == 0:
            return None

        if parts[0] not in AUTH_HEADER_TYPE_BYTES:
            return None

        if len(parts) != 2:
            raise AuthenticationFailed(
                _('Authorization header must contain two space-delimited values'),
                code='bad_authorization_header',
            )

        return parts[1]

    def get_validated_token(self, raw_token):
        """
        Validates an encoded JWT and returns a validated token wrapper object.
        """

        messages = []

        for AuthToken in api_settings.AUTH_TOKEN_CLASSES:
            try:
                return AuthToken(raw_token)
            except TokenError as e:
                messages.append({'token_class': AuthToken.__name__,
                                 'token_type': AuthToken.token_type,
                                 'message': e.args[0]})

        raise InvalidToken({
            'detail': _('The given token is not valid for any token type'),
            'messages': messages,
        })

    def get_user(self, validated_token):
        """
        Attempts to find and return a user using the given validated token.
        """
        try:
            user_id = validated_token[api_settings.USER_ID_CLAIM]
        except KeyError:
            raise InvalidToken(
                _('Token contianed no recognizable user identification'))
        try:
            user = self.user_model.objects.get(**{api_settings.USER_ID_FIELD:
                                                  user_id})
        except self.user_model.DoesNotExist:
            raise AuthenticationFailed(
                _('User not found'), code='user_not_found')

        if not user.is_active:
            raise AuthenticationFailed(
                _('User is disabled'), code='user_inactive')

        return user


def default_user_authentication_rule(user):
    return True if user is not None and user.is_active else False
