"""
WSGI config for bifrost project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from bifrost.signals import ServiceContainerInit

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bifrost.settings')

service_init = ServiceContainerInit()
service_init.notify_listeners()

application = get_wsgi_application()
