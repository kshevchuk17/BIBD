from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('bank.urls')),
    path('base-auth/', include('rest_framework.urls')),

    # path to djoser end points
    path('', include('djoser.urls')),
    path('', include('djoser.urls.jwt')),

    # path to our account's app endpoints
    # path("api/accounts/", include("accounts.urls"))
]
