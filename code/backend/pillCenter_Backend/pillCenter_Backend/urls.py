from django.contrib import admin
from django.urls import path, include
from django_email_verification import urls as email_urls  # include the urls

from . import settings as setting

api_prefix = setting.API_PREFIX
urlpatterns = [
   path('admin/', admin.site.urls),
   path(f'{api_prefix}''email/', include(email_urls)),
   path(f'{api_prefix}', include('polls.api.urls')),
   path('accounts/', include('django.contrib.auth.urls')), ] 
