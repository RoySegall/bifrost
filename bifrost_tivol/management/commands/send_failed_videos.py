import os
from glob import glob

from sendgrid import SendGridAPIClient
from django.core.management.base import BaseCommand
from bifrost.local_settings import sendgird
from sendgrid.helpers.mail import (
    Mail, Attachment, FileContent, FileName,
    FileType, Disposition, ContentId)
import base64
import os


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_videos(self, message: Mail):

        files = glob(os.path.join(os.getcwd(), 'static', 'cypress', 'videos', '*.mp4'))
        for file in files:
            with open(file, 'rb') as f:
                data = f.read()
                f.close()
            filename = file.split('/',)[-1]
            encoded = base64.b64encode(data).decode()
            attachment = Attachment()
            attachment.file_content = FileContent(encoded)
            attachment.file_type = FileType('video/mp4')
            attachment.file_name = FileName('_'.join(filename.split('.')[0:-1])+'.mp4')
            attachment.disposition = Disposition('attachment')
            attachment.content_id = ContentId('Example Content ID')

            message.add_attachment(attachment)

    def add_picturs(self, message: Mail):
        files = glob(os.path.join(os.getcwd(), 'static', 'cypress', 'screenshots', '*', '*.png'))

        for file in files:
            with open(file, 'rb') as f:
                data = f.read()
                f.close()
            filename = file.split('/',)[-1]
            encoded = base64.b64encode(data).decode()
            attachment = Attachment()
            attachment.file_content = FileContent(encoded)
            attachment.file_type = FileType('image/png')
            attachment.file_name = FileName(filename)
            attachment.disposition = Disposition('attachment')
            attachment.content_id = ContentId('Example Content ID')

            message.add_attachment(attachment)

    def handle(self, *args, **options):

        message = Mail(
            from_email='from_email@example.com',
            to_emails='roy@segall.io',
            subject='Sending with Twilio SendGrid is Fun',
            html_content='This are the failed tests videos',)

        self.add_videos(message)
        self.add_picturs(message)

        try:
            sg = SendGridAPIClient(sendgird)
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            print(str(e))
