from abc import abstractmethod


class ServiceBase:

    @abstractmethod
    def info(self):
        pass
