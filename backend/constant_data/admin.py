from django.contrib import admin

from .models import City, SupplementaryInsurance


# Register your models here.
class CityAdmin(admin.ModelAdmin):
    search_fields = ('name', 'fa_name',)
    list_display = ('name', 'fa_name', 'parent')
    ordering = ('name', 'parent',)


class SupplementaryInsuranceAdmin(admin.ModelAdmin):
    search_fields = ('name', 'fa_name')
    list_display = ('name', 'fa_name')
    ordering = ('name',)


admin.site.register(City, CityAdmin)
admin.site.register(SupplementaryInsurance, SupplementaryInsuranceAdmin)
