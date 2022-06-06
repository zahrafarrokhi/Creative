from django.contrib import admin

from .models import Patient, Address


class PatientAdmin(admin.ModelAdmin):
    search_fields = ( 'national_id', 'last_name', 'first_name')
    list_display = ('user', 'national_id', 'last_name',
                    'first_name', 'date_of_birth', 'gender', 'city')
    ordering = ('national_id', 'last_name', 'first_name')
    fields = None
    fieldsets = (
        ('patient info',
         {'fields': ('user', 'national_id', 'last_name', 'first_name', 'date_of_birth',
                     'gender', 'city', 'supplementary_insurance',
                     'insurance')}),
    )


admin.site.register(Patient, PatientAdmin)


class AddressAdmin(admin.ModelAdmin):
    search_fields = ( 'name', 'address', 'postal_code',
                     'reciever', 'phone_number', 'location')
    list_display = ('user', 'name', 'address', 'postal_code',
                    'reciever', 'phone_number', 'location')
    ordering = ('postal_code',)
    fields = None
    fieldsets = (
        ('address info',
         {'fields': ('user', 'name', 'address', 'postal_code', 'reciever', 'phone_number', 'location')}),
    )


admin.site.register(Address, AddressAdmin)
