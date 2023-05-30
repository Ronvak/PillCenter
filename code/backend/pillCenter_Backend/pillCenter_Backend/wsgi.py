"""
WSGI config for pillCenter_Backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

SERVER_BASE = '/var/www/pillcenter/server'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pillCenter_Backend.settings')

sys.path.append(SERVER_BASE)
sys.path.append(f'{SERVER_BASE}/pillCenter_Backend')
sys.path.append(f'{SERVER_BASE}/polls')
sys.path.append(f'{SERVER_BASE}/media/qr_codes')

application = get_wsgi_application()
