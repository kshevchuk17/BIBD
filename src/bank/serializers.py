from rest_framework import serializers
from .models import *


class UserDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username', )


class ProfileDetailSerializer(serializers.ModelSerializer):
	user = UserDetailSerializer(read_only=True, many=False)

	class Meta:
		model = Profile
		fields = ('user', 'birth_date', 'phone_number', 'passport_number', 'identification_number', 'place_of_birth')


class DepositsTypeDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = DepositsType
		fields = '__all__'


class DepositDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Deposit
		fields = '__all__'


class CreditsTypeDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = CreditsType
		fields = '__all__'


class CreditDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Credit
		fields = '__all__'


class RequestForOpeningDepositSerializer(serializers.ModelSerializer):
	class Meta:
		model = RequestForOpeningDeposit
		fields = ('user', 'deposit_amount', 'deposit_type', 'email')


class RequestForOpeningCreditSerializer(serializers.ModelSerializer):
	class Meta:
		model = RequestForOpeningCredit
		fields = ('user', 'credit_amount', 'credit_type', 'email')

# =====================================================================================================================


class ProfileListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = '__all__'


class DepositsTypeListSerializer(serializers.ModelSerializer):
	class Meta:
		model = DepositsType
		fields = '__all__'


class DepositListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Deposit
		fields = ('contract_number', 'opening_date', 'closed_date', 'deposit_amount', 'final_amount',
				  'status', 'deposit_type', 'user')


class CreditsTypeListSerializer(serializers.ModelSerializer):
	class Meta:
		model = CreditsType
		fields = '__all__'


class CreditListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Credit
		fields = ('contract_number', 'opening_date', 'closed_date', 'credit_amount', 'payment_amount', 'status',
				  'overdue_status', 'paid_off', 'remains', 'payment_per_month', 'credit_type', 'user')

