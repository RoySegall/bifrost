import django.dispatch

init_service = django.dispatch.Signal()


class ServiceContainerInit:

    def notify_listeners(self):
        init_service.send(sender=self.__class__)
