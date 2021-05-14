from django.contrib import admin
from .models import *


class ProfileAdmin(admin.ModelAdmin):
	list_display = ('user', 'birth_date', 'phone_number', 'passport_number', 'identification_number', 'place_of_birth')
	list_filter = ('birth_date', )
	search_fields = ('user', 'passport_number', 'phone_number', 'birth_date', )
	sortable_by = ('birth_date', )


class DepositTypeAdmin(admin.ModelAdmin):
	list_display = ('deposit_name', 'deposit_rate', 'deposit_term', 'description')
	list_filter = ('deposit_rate', 'deposit_term')
	search_fields = ('deposit_name', 'deposit_rate', 'deposit_term')
	sortable_by = ('deposit_rate', 'deposit_term')


class DepositAdmin(admin.ModelAdmin):
	list_display = ('contract_number', 'opening_date', 'closed_date', 'deposit_amount', 'final_amount',
					'status', 'deposit_type', 'user', )
	list_filter = ('opening_date', 'deposit_amount', 'status', 'deposit_type')
	search_fields = ('contract_number', 'opening_date', 'deposit_amount', 'deposit_type')
	sortable_by = ('opening_date', 'closed_date', 'deposit_amount', 'status', 'deposit_type')


class CreditTypeAdmin(admin.ModelAdmin):
	list_display = ('credit_name', 'credit_rate', 'credit_term', 'description')
	list_filter = ('credit_rate', 'credit_term')
	search_fields = ('credit_name', 'credit_rate', 'credit_term')
	sortable_by = ('credit_rate', 'credit_term')


class CreditAdmin(admin.ModelAdmin):
	list_display = ('contract_number', 'opening_date', 'closed_date', 'credit_amount', 'payment_amount', 'status',
					'overdue_status', 'paid_off', 'remains', 'payment_per_month', 'credit_type', 'user')
	list_filter = ('opening_date', 'credit_amount', 'status', 'overdue_status', 'credit_type')
	search_fields = ('contract_number', 'opening_date', 'credit_amount', 'credit_type')
	sortable_by = ('opening_date', 'closed_date', 'credit_amount', 'status', 'credit_type')


class RequestForOpeningDepositAdmin(admin.ModelAdmin):
	...


class RequestForOpeningCredit(admin.ModelAdmin):
	...

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Deposit, DepositAdmin)
admin.site.register(DepositsType, DepositTypeAdmin)
admin.site.register(Credit, CreditAdmin)
admin.site.register(CreditsType, CreditTypeAdmin)
