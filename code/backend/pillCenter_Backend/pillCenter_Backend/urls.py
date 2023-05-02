from django.contrib import admin
from django.urls import path, include
from django_email_verification import urls as email_urls  # include the urls
from django.conf.urls.static import static
from django.conf import settings
from . import settings as setting

api_prefix = setting.API_PREFIX
urlpatterns = [
   path('admin/', admin.site.urls),
   path('email/', include(email_urls)),
   path(f'{api_prefix}', include('polls.api.urls')),
   path('accounts/', include('django.contrib.auth.urls')), ] + static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)
