from django.shortcuts import render
from rest_framework import generics
from rest_framework.generics import get_object_or_404
from .serializers import *
from .permissions import *
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class ProfileCreateView(generics.CreateAPIView):
	serializer_class = ProfileDetailSerializer
	permission_classes = (IsAuthenticated, )

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)


class DepositsTypeCreateView(generics.CreateAPIView):
	serializer_class = DepositsTypeDetailSerializer
	permission_classes = (IsAuthenticated, IsAdminUser)


# class DepositCreateView(generics.CreateAPIView):
# 	serializer_class = DepositDetailSerializer
# 	permission_classes = (IsAuthenticated, )


class CreditsTypeCreateView(generics.CreateAPIView):
	serializer_class = CreditsTypeDetailSerializer
	permission_classes = (IsAuthenticated, IsAdminUser)


class RequestForOpeningDepositView(generics.CreateAPIView):
	serializer_class = RequestForOpeningDepositSerializer
	permission_classes = (IsAuthenticated, )

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)


class RequestForOpeningCreditView(generics.CreateAPIView):
	serializer_class = RequestForOpeningCreditSerializer
	permission_classes = (IsAuthenticated, )

	def perform_create(self, serializer):
		serializer.save(user=self.request.user)


# ====================================================================================


class ProfileListView(generics.ListAPIView):
	serializer_class = ProfileListSerializer
	queryset = User.objects.all()
	permission_classes = (IsAuthenticated, )


class DepositsTypeListView(generics.ListAPIView):
	serializer_class = DepositsTypeListSerializer
	queryset = DepositsType.objects.all()
	# permission_classes = (IsAuthenticated, )


class DepositListView(generics.ListAPIView):
	serializer_class = DepositListSerializer
	queryset = Deposit.objects.all()
	permission_classes = (IsAuthenticated, )

	def get_queryset(self):
		user = self.request.user
		return Deposit.objects.filter(user=user)
	# получение списка дерозитов для аутентифицированного юзера


class CreditsTypeListView(generics.ListAPIView):
	serializer_class = CreditsTypeListSerializer
	queryset = CreditsType.objects.all()
	permission_classes = (IsAuthenticated, )


class CreditListView(generics.ListAPIView):
	serializer_class = CreditListSerializer
	queryset = Credit.objects.all()
	permission_classes = (IsAuthenticated, )

	def get_queryset(self):
		user = self.request.user
		return Credit.objects.filter(user=user)
	# получение списка дерозитов для аутентифицированного юзера


# ====================================================================================================================


class ProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = ProfileDetailSerializer
	queryset = Profile.objects.all()
	permission_classes = (IsAuthenticated, )

	def get_object(self):
		obj = get_object_or_404(self.queryset, user=self.request.user)
		return obj


class DepositsTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = DepositsTypeDetailSerializer
	queryset = DepositsType.objects.all()
	permission_classes = (IsAuthenticated, )


class DepositDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = DepositDetailSerializer
	queryset = Deposit.objects.all()
	permission_classes = (IsAuthenticated, )


class CreditsTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = CreditsTypeDetailSerializer
	queryset = CreditsType.objects.all()
	permission_classes = (IsAuthenticated, )


class CreditDetailView(generics.RetrieveUpdateDestroyAPIView):
	serializer_class = CreditDetailSerializer
	queryset = Credit.objects.all()
	permission_classes = (IsAuthenticated, )
