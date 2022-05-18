import re

from django import forms
from django.contrib import admin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User, OTP, Token, VerificationCode
from django.utils.translation import gettext_lazy as _


class UserCreationForm(forms.ModelForm):
    # A form for creating new users. Includes all the required
    # fields, plus a repeated password.
    password1 = forms.CharField(
        label='Password', required=False, widget=forms.PasswordInput)
    phone_number = forms.CharField(label='Phone number', required=False)
    password = ReadOnlyPasswordHashField()

    #  password2 = forms.CharField(
    #      label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email', 'phone_number', 'password')

    #  def clean_password2(self):
    #      # Check that the two password entries match
    #      password1 = self.cleaned_data.get("password1")
    #      password2 = self.cleaned_data.get("password2")
    #      if password1 and password2 and password1 != password2:
    #          raise forms.ValidationError("Passwords don't match")
    #      return password2

    def clean_phone_number(self):
        data = self.cleaned_data.get('phone_number')
        if re.fullmatch(r"^09\d{9}$", data):
            return data
        elif data != "" and data:
            raise forms.ValidationError(
                _("Invalid phone number"))
        elif data == "":
            return None
        else:
            return data

    def clean(self):
        email = self.cleaned_data.get('email')
        phone_number = self.cleaned_data.get('phone_number')
        if not email and not phone_number:
            raise forms.ValidationError(
                _("At least one of email/phone number must be specified"))

        pss = self.cleaned_data.get("password1")
        if pss and pss != "":
            self.cleaned_data['password'] = pss
        else:
            self.cleaned_data['password'] = None

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        new_password = self.cleaned_data.get("password", None)
        if new_password:
            user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class CustomUserAdmin(admin.ModelAdmin):
    add_form = UserCreationForm
    form = UserCreationForm
    search_fields = ('phone_number', 'email',)
    list_display = ('phone_number', 'email', 'is_staff')
    ordering = ('phone_number', 'email',)
    fields = None
    fieldsets = (
        ('Personal info', {'fields': (
            'email', 'email_verified', 'phone_number', 'phone_number_verified',
            'password1', 'type',)}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Permissions', {'fields': ('is_active', 'is_staff',
                                    'is_superuser', 'groups', 'user_permissions')}),
    )


class CustomOTP(admin.ModelAdmin):
    readonly_fields = ('user', 'created_at', 'updated_at')
    search_fields = ('user', 'is_active', 'created_at', 'updated_at', 'exp_date')
    list_display = ('user', 'is_active', 'created_at', 'updated_at', 'exp_date', 'value',)
    ordering = ('created_at', 'user',)
    fields = None
    fieldsets = (
        ('info', {'fields': ('user', 'is_active', 'value',)}),
        ('times', {'fields': ('created_at', 'updated_at', 'exp_date')}),
    )


class CustomToken(admin.ModelAdmin):
    readonly_fields = ('user', 'created_at', 'updated_at')
    search_fields = ('user', 'exp_date', 'session')
    list_display = ('user', 'exp_date', 'session')
    ordering = ('created_at', 'user',)
    fields = None
    fieldsets = (
        ('info', {'fields': ('user', 'device_info', 'session',)}),
        ('times', {'fields': ('created_at', 'updated_at', 'exp_date')}),
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(OTP, CustomOTP)
admin.site.register(Token, CustomToken)
