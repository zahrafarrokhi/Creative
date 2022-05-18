from .models import User, OTP, Token
from datetime import timedelta, datetime
from .settings import api_settings
from calendar import timegm
from datetime import datetime
from django.conf import settings
from django.utils.functional import lazy
from django.utils.timezone import is_naive, make_aware, utc
from django.utils import timezone


def create_callback_token_for_user(user, alias_type, token_type):
    token = OTP.objects.create(user=user, type=token_type, is_active=True,
                               exp_date=(timezone.now() +
                                         timedelta(seconds=api_settings.OTP_EXPIRE_TIME)))

    return token


def make_utc(dt):
    if settings.USE_TZ and is_naive(dt):
        return make_aware(dt, timezone=utc)

    return dt


def aware_utcnow():
    return make_utc(datetime.utcnow())


def datetime_to_epoch(dt):
    return timegm(dt.utctimetuple())


def datetime_from_epoch(ts):
    return make_utc(datetime.utcfromtimestamp(ts))


def format_lazy(s, *args, **kwargs):
    return s.format(*args, **kwargs)


format_lazy = lazy(format_lazy, str)
