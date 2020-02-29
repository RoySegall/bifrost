import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        message = Mail(
            from_email='from_email@example.com',
            to_emails='roy@segall.io',
            subject='Sending with Twilio SendGrid is Fun',
            html_content='<strong>and easy to do anywhere, even with Python</strong>')
        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(str(e))
