from django.contrib import admin
from django.urls import path, include
from django_email_verification import urls as email_urls  # include the urls

urlpatterns = [
   path('admin/', admin.site.urls),
   path('email/', include(email_urls)),
   path('api/', include('polls.api.urls')),
   path('accounts/', include('django.contrib.auth.urls')),
]