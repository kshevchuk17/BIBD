from django.db import models
from django.contrib.auth import get_user_model
from dateutil.relativedelta import relativedelta
import datetime

User = get_user_model()


class Profile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
	birth_date = models.DateField(verbose_name='Birth Date', blank=True, null=True)
	phone_number = models.CharField(verbose_name='Phone', max_length=13)
	passport_number = models.CharField(verbose_name='PASSPORT №', max_length=9)
	identification_number = models.CharField(verbose_name='IDENTIFICATION №', max_length=9)
	place_of_birth = models.CharField(verbose_name='Place od birth', max_length=255)


class DepositsType(models.Model):
	deposit_name = models.CharField(verbose_name='Deposit Name', max_length=32)
	deposit_rate = models.FloatField(verbose_name='Deposit Rate')
	deposit_term = models.FloatField(verbose_name='Deposit Term')
	description = models.TextField(verbose_name='Description')


class Deposit(models.Model):
	contract_number = models.CharField(verbose_name='Contract Number', max_length=16)
	opening_date = models.DateField(verbose_name='Opening Date')
#	closed_date = models.DateField(verbose_name='Closed Date')									# Считается как opening_date + deposit_term
	deposit_amount = models.FloatField(verbose_name='Deposit Amount')							# Сумма депозита
#	final_amount = models.FloatField(verbose_name='Final Amount')								# Сумма выплаты по истечению срока вклада
	status = models.BooleanField(verbose_name='Deposit Status', default=False)
	deposit_type = models.ForeignKey(DepositsType, null=True, on_delete=models.SET_NULL)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

	@property
	def closed_date(self):
		return self.opening_date + relativedelta(years=int(self.deposit_type.deposit_term),
												 	months=int(self.deposit_type.deposit_term % 1))

	@property
	def final_amount(self):
		payout = self.deposit_amount
		for i in range(int(self.deposit_type.deposit_term)):
			payout *= 1 + (self.deposit_type.deposit_rate * 0.01)
		if int(self.deposit_type.deposit_term) == self.deposit_type.deposit_term:
			return payout
		return payout * (1 + (self.deposit_type.deposit_rate / 2))


class CreditsType(models.Model):
	credit_name = models.CharField(verbose_name='Credit Name', max_length=32)
	credit_rate = models.FloatField(verbose_name='Credit Rate')
	credit_term = models.FloatField(verbose_name='Credit Term')
	description = models.TextField(verbose_name='Description')


class Credit(models.Model):
	contract_number = models.CharField(verbose_name='Contract Number', max_length=16)
	opening_date = models.DateField(verbose_name='Opening Date')
#	closed_date = models.DateField(verbose_name='Closed Date')									# Считается как opening_date + credit_term
	credit_amount = models.FloatField(verbose_name='Credit Amount')								# Сумма кредита
#	payment_amount = models.FloatField(verbose_name='Payment Amount')							# Сумма с процентами
	status = models.BooleanField(verbose_name='Credit Status', default=False)					# Статус кредита (активен / не активен)
	overdue_status = models.BooleanField(verbose_name='Overdue Status', default=False)			# Статус просроченности платежа
	paid_off = models.FloatField(verbose_name='Paid Off')										# Сколько погашено
#	remains = models.FloatField(verbose_name='Remains')											# Сколько осталось
#	payment_per_month = models.FloatField(verbose_name='Payment per month')						# Сумма оплаты в месяц
	credit_type = models.ForeignKey(CreditsType, null=True, on_delete=models.SET_NULL)
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

	@property
	def closed_date(self):
		return self.opening_date + relativedelta(years=int(self.credit_type.credit_term),
												 	months=int(self.credit_type.credit_term % 1))

	@property
	def payment_amount(self):
		payment = self.credit_amount
		for i in range(int(self.credit_type.credit_term)):
			payment *= 1 + (self.credit_type.credit_rate * 0.01)
		if int(self.credit_type.credit_term) == self.credit_type.credit_term:
			return payment
		return payment * (1 + (self.credit_type.credit_rate / 2))

	@property
	def remains(self):
		return self.payment_amount - self.paid_off

	@property
	def payment_per_month(self):
		return self.payment_amount / (relativedelta(self.closed_date, self.opening_date).months +
									  	(relativedelta(self.closed_date, self.opening_date).years * 12))


class RequestForOpeningDeposit(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	deposit_amount = models.FloatField(verbose_name='Deposit Amount')							# Сумма депозита
	deposit_type = models.ForeignKey(DepositsType, null=True, on_delete=models.SET_NULL)

	@property
	def email(self):
		return self.user.email


class RequestForOpeningCredit(models.Model):
	user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
	credit_amount = models.FloatField(verbose_name='Credit Amount')								# Сумма кредита
	credit_type = models.ForeignKey(CreditsType, null=True, on_delete=models.SET_NULL)

	@property
	def email(self):
		return self.user.email
