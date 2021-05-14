from django.contrib import admin
from django.urls import path, include
from .views import *


app_name = 'bank'
urlpatterns = [
	path('profile/create/', ProfileCreateView.as_view()),                              	#
	path('deposit_type/all/', DepositsTypeListView.as_view()),							#
	path('deposit/all/', DepositListView.as_view()),									#
	path('credit_type/all/', CreditsTypeListView.as_view()),							#
	path('credit/all/', CreditListView.as_view()),										#
	path('profile/detail/', ProfileDetailView.as_view()),								#
	path('deposit_type/detail/<int:pk>/', DepositsTypeDetailView.as_view()),
	path('deposit/detail/<int:pk>/', DepositDetailView.as_view()),
	path('credit_type/detail/<int:pk>/', CreditsTypeDetailView.as_view()),
	path('credit/detail/<int:pk>/', CreditDetailView.as_view()),

	path('credit/request_for_opening/', RequestForOpeningCreditView.as_view()),
	path('deposit/request_for_opening/', RequestForOpeningDepositView.as_view()),
]