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
from os.path import join


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_videos(self, message: Mail):
        """
        Adding videos to the email.
        """
        files = glob(join(os.getcwd(), 'static', 'cypress', 'videos', '*.mp4'))

        for file in files:
            with open(file, 'rb') as f:
                data = f.read()
                f.close()

            filename = file.split('/', )[-1]
            encoded = base64.b64encode(data).decode()
            attachment = Attachment()
            attachment.file_content = FileContent(encoded)
            attachment.file_type = FileType('video/mp4')
            attachment.file_name = FileName(
                '_'.join(filename.split('.')[0:-1]) + '.mp4')
            attachment.disposition = Disposition('attachment')
            attachment.content_id = ContentId('Example Content ID')

            message.add_attachment(attachment)

    def add_picturs(self, message: Mail):
        """
        Adding the pictures to the email.
        """
        path = join(os.getcwd(),
                    'static', 'cypress', 'screenshots', '*', '*.png')
        files = glob(path)

        for file in files:
            with open(file, 'rb') as f:
                data = f.read()
                f.close()
            filename = file.split('/', )[-1]
            encoded = base64.b64encode(data).decode()
            attachment = Attachment()
            attachment.file_content = FileContent(encoded)
            attachment.file_type = FileType('image/png')
            attachment.file_name = FileName(filename)
            attachment.disposition = Disposition('attachment')
            attachment.content_id = ContentId('Example Content ID')

            message.add_attachment(attachment)

    def handle(self, *args, **options):

        if 'SEND_ON_FAIL' not in os.environ:
            # Don't send mail when the build is failing. For various reason but
            # we won't mention them here.
            return

        # Building the variables.
        subject = f"Dear {os.environ['AUTHOR_NAME']} " \
                  f"{os.environ['TRAVIS_COMMIT_MESSAGE']} on " \
                  f"{os.environ['TRAVIS_BRANCH']} is failing"
        mail_content = f"For some reason, the commit has been failed. " \
                       f"Screenshots and videos are attached. You can see " \
                       f"the logs " \
                       f"<a href='{os.environ['TRAVIS_BUILD_WEB_URL']}>" \
                       f"here</a>."

        # Building the email alongside the media of the email.
        message = Mail(
            from_email='dont-reply@your-trusty.ci',
            to_emails=os.environ['COMMITTER_EMAIL'],
            subject=subject,
            html_content=mail_content,
        )

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
