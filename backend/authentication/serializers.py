from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.db.models import Q
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import User, OTP, Token
from .settings import api_settings
from .tokens import AccessToken

SMS_AUTH = 'phone_number'
EMAIL_AUTH = 'email'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'phone_number', 'email', 'phone_number_verified',
                  'email_verified', 'type']


class TokenField(serializers.CharField):
    default_error_messages = {
        'required': _('Invalid Token'),
        'invalid': _('Invalid Token'),
        'blank': _('Invalid Token'),
        'max_length': _('Tokens are {max_length} digits long.'),
        'min_length': _('Tokens are {min_length} digits long.')
    }


class AbstractBaseAuthenticationSerializer(serializers.Serializer):

    @property
    def alias_type(self):
        raise NotImplementedError

    def validate(self, attrs):
        #  phone_number = attrs.get('phone_number', None)
        #  email = attrs.get('email', None)
        # example
        # alias_type = 'phone_number'
        # attrs.get(self.alias_type) = '0912...' = alias
        alias = attrs.get(self.alias_type)

        #  phone_number = attrs.get('phone_number', None)
        #  email = attrs.get('email', None)
        #  if phone_number is None and email is None:
        if alias is None:
            msg = _("Please fill the required fields")
            raise serializers.ValidationError(msg)

        if alias:
            try:
                user = User.objects.get(**{self.alias_type: alias})

                previous_tokens = OTP.objects.filter(
                    user=user, is_active=True)

                for tok in previous_tokens:
                    tok.is_active = False

                OTP.objects.bulk_update(previous_tokens, ['is_active'])
            except User.DoesNotExist:
                print(f"Creating User {alias}")
                user = User.objects.create(**{self.alias_type: alias})
                user.set_unusable_password()
                user.save()

            if not user.is_active:
                msg = _('This account is disabled.')
                raise serializers.ValidationError(msg)
        else:
            msg = _('Missing %s.') % self.alias_type
            raise serializers.ValidationError(msg)

        attrs['user'] = user
        return attrs # {'user': User(), 'phone_number': '0923....'}


class EmailAuthSerializer(AbstractBaseAuthenticationSerializer):
    @property
    def alias_type(self):
        return EMAIL_AUTH

    email = serializers.EmailField()


class MobileAuthSerializer(AbstractBaseAuthenticationSerializer):
    @property
    def alias_type(self):
        return SMS_AUTH

    phone_regex = RegexValidator(
        regex=r'^\d{10,16}$', message=_("Invalid Mobile Number"))
    phone_number = serializers.CharField(
        validators=[phone_regex], max_length=17)


def validate_token_age(token):
    try:
        tok = OTP.objects.get(value=token, is_active=True)
        tm = (timezone.now() - tok.created_at).total_seconds()

        if tm <= api_settings.OTP_EXPIRE_TIME:
            return True
        else:
            tok.is_active = False
            tok.save()
            return False
    except OTP.DoesNotExist:
        return False

# confirm page(validate otp = 4 digits)
class CallbackTokenSerializer(serializers.Serializer):
    phone_regex = RegexValidator(
        regex=r'^\d{10,16}$', message=_("Invalid Mobile Number"))
    phone_number = serializers.CharField(
        validators=[phone_regex], max_length=17, required=False)
    email = serializers.EmailField(required=False)
    token = TokenField(min_length=api_settings.OTP_LENGTH, max_length=api_settings.OTP_LENGTH,
                       validators=[validate_token_age])
    user = UserSerializer(many=False, read_only=True)
    # attrs (user insert data = request.POST/request.data)
    def validate_alias(self, attrs):
        email = attrs.get('email', None)
        phone_number = attrs.get('phone_number', None)

        if email and phone_number:
            raise serializers.ValidationError()

        if not email and not phone_number:
            raise serializers.ValidationError()

        if email:
            return 'email', email
        elif phone_number:
            return 'phone_number', phone_number

        return None

    def validate(self, attrs):
        try:
            alias_type, alias = self.validate_alias(attrs) # 'email', 'z@yahoo.com' -> line 138,140

            callback_token = attrs.get('token', None)

            user = User.objects.get(**{alias_type: alias})

            token = OTP.objects.get(**{
                'user': user,
                'value': callback_token,
                'is_active': True,
            })
            print(token.id, token.value)
            print(token.exp_date, timezone.now())
            if token.exp_date < timezone.now():
                token.is_active = False
                token.save()
                msg = _('Invalid Token')
                raise serializers.ValidationError(msg)

            if token.user == user:
                if not user.is_active:
                    msg = _('User account is disabled')
                    raise serializers.ValidationError(msg)

                if alias_type == 'email' and user.email_verified is False:
                    user.email_verified = True
                    user.save()
                if alias_type == 'phone_number' and user.phone_number_verified is False:
                    user.phone_number_verified = True
                    user.save()

                token.is_active = False
                token.save()

                # This results in error because user is not serializable
                # attrs['user'] = user
                attrs['user'] = UserSerializer(instance=user).data

                # Create JWT?!? (user, *_*created_at*_*, updated_at, exp_date, session) ?!?jedi?!?
                access_token = AccessToken.for_user(user)
                refresh_token = (Token.objects.
                                 create(user=user,
                                        exp_date=timezone.now() +
                                                 api_settings.REFRESH_TOKEN_LIFETIME))

                attrs['access_tok'] = str(access_token)
                attrs['refresh_tok'] = refresh_token.session
                attrs['refresh_tok_exp'] = refresh_token.exp_date
                attrs['access_tok_exp'] = access_token.get_exp()

                return attrs
            else:
                msg = _('Invalid Token')
                raise serializers.ValidationError(msg)

        except OTP.DoesNotExist:
            msg = _('Invalid alias parameters provided.')
            raise serializers.ValidationError(msg)
        except User.DoesNotExist:
            msg = _('Invalid user alias parameters provided')
            raise serializers.ValidationError(msg)
        except ValidationError:
            msg = _('Invalid ailas parameters provided.')
            raise serializers.ValidationError(msg)

# (response401 => unauthorized(access token expired)) =>TokenRefreshSerializer excute in  backgruond
class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    user_id = serializers.CharField()
    access = serializers.ReadOnlyField()

    def validate(self, attrs):
        data = {}
        print("Refreshing token")
        try:
            ref = Token.objects.get(
                session=attrs['refresh'],
                user=User.objects.get(Q(email=attrs['user_id']) |
                                      Q(phone_number=attrs['user_id'])))
            if ref.exp_date < timezone.now():
                msg = _("Refresh token has expired")
                raise serializers.ValidationError(msg)
            user = ref.user
            tok = AccessToken.for_user(user)  # Create JWT
            data['access_tok'] = str(tok)
            data['access_tok_exp'] = tok.get_exp()
        except Token.DoesNotExist:
            msg = _('Invalid token')
            raise serializers.ValidationError(msg)
        except User.DoesNotExist:
            msg = _('Invalid user')
            raise serializers.ValidationError(msg)

        return data


