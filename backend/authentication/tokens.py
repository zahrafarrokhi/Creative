from uuid import uuid4

from django.utils import timezone
from django.utils.text import format_lazy
from django.utils.translation import gettext_lazy as _

from .exceptions import TokenBackendError, TokenError
from .settings import api_settings
from .utils import (
    datetime_to_epoch, datetime_from_epoch
)


class Token:
    """
    A class which validates and wraps an existing JWT or can be used to build a new JWT
    """

    token_type = None
    lifetime = None

    def __init__(self, token=None, verify=True):
        """
        !!!! IMPORTANT !!!! MUST raise a TokenError with a user-facing error
        message if the given token is invalid, expired, or otherwise not safe
        to use.
        """
        if self.token_type is None or self.lifetime is None:
            raise TokenError(_('Cannot create token with no type of lifetime'))

        self.token = token
        self.current_time = timezone.now()

        if token is not None:
            token_backend = self.get_token_backend()

            try:
                self.payload = token_backend.decode(token, verify=verify)
            except TokenBackendError:
                raise TokenError(_('Token is invalid or expired'))

            if verify:
                self.verify()

        else:
            self.payload = {api_settings.TOKEN_TYPE_CLAIM: self.token_type}

            self.set_exp(from_time=self.current_time, lifetime=self.lifetime)

            self.set_jti()

    def __repr__(self):
        return repr(self.payload)

    def __getitem__(self, key):
        return self.payload[key]

    def __setitem__(self, key, value):
        self.payload[key] = value

    def __delitem__(self, key):
        del self.payload[key]

    def __contains__(self, key):
        return key in self.payload

    def get(self, key, default=None):
        return self.payload.get(key, default)

    def __str__(self):
        """
        Signs and returns a token as a base64 encoded string
        """
        return self.get_token_backend().encode(self.payload)

    def verify(self):
        """
        Performs additinoal validation steps which were not performed when this token
        was decoded. This method is part of the "public" API to indicate the nitention
        that it may be overridden in subclasses
        """
        self.check_exp()

        if api_settings.JTI_CLAIM not in self.payload:
            raise TokenError(_('Token has no id'))

        self.verify_token_type()

    def verify_token_type(self):
        """
        Ensures that the token type claim is present and has the correct value
        """
        try:
            token_type = self.payload[api_settings.TOKEN_TYPE_CLAIM]
        except KeyError:
            raise TokenError(_('Token has no type'))

        if self.token_type != token_type:
            raise TokenError(_('Token has wrong type'))

    def set_jti(self):
        """
        Populates the configured jti claim of a token with a string where there is a
        negligible probibility that the same string will be chosen at a later time

        See here:
        https://tools.ietf.org/html/rfc7519#section-4.1.7
        """
        self.payload[api_settings.JTI_CLAIM] = uuid4().hex

    def set_exp(self, claim='exp', from_time=None, lifetime=None):
        """
        Updates the expiration time a token
        """
        if from_time is None:
            from_time = self.current_time

        if lifetime is None:
            lifetime = self.lifetime

        self.payload[claim] = datetime_to_epoch(from_time + lifetime)

    def get_exp(self):
        return self.current_time + self.lifetime

    def check_exp(self, claim='exp', current_time=None):
        """
        """
        if current_time is None:
            current_time = self.current_time

        try:
            claim_value = self.payload[claim]
        except KeyError:
            raise TokenError(format_lazy(_("Token has no '{}' claim"), claim))

        claim_time = datetime_from_epoch(claim_value)
        if claim_time <= current_time:
            raise TokenError(format_lazy(
                _("Token '{}' claim has expired"), "exp"))  # todo @Atrin plz check this line: I added " mark around exp

    @classmethod
    def for_user(cls, user):
        """
        Returns an authorization token for the given user that will be provided
        after authenticating the user's credentials.
        """
        user_id = getattr(user, api_settings.USER_ID_FIELD)
        if not isinstance(user_id, int):
            user_id = str(user_id)

        token = cls()
        token[api_settings.USER_ID_CLAIM] = user_id

        return token

    def get_token_backend(self):
        from .state import token_backend
        return token_backend


class AccessToken(Token):
    token_type = 'access'
    lifetime = api_settings.ACCESS_TOKEN_LIFETIME
