#  from zeep import Client

from clinic import settings
from clinic.settings import SMS_PANEL_SETTINGS
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from .utils import create_callback_token_for_user
import requests

import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)


class TokenService(object):
    @staticmethod
    def send_token(user, alias_type, token_type, **message_payload):
        token = create_callback_token_for_user(user, alias_type, token_type)
        send_action = None

        success = False

        if alias_type == 'phone_number':
            #  if SMS_PANEL_SETTINGS.get('SMS_PANEL_USERNAME', None) and SMS_PANEL_SETTINGS.get('SMS_PANEL_PASSWORD',
            if SMS_PANEL_SETTINGS.get('SMS_PANEL_TOKEN', None):
                success = SMSPanelService.send_sms(
                    user.phone_number, [token.value], settings.SMS_MESSAGE_TEXT_ID)
            else:
                success = True  # todo: wtf, fix later
        elif alias_type == 'email':
            if settings.EMAIL_HOST != '' and settings.EMAIL_HOST:
                EmailService.send_email([user.email], "کلینیک دیابت و غدد",
                                        "authentication/code.html", {"token": token.value})
                success = True
            else:
                success = True

        return success

 

class EmailService:
    @staticmethod
    def send_email(recipient_list, subject, template, variables):
        message = render_to_string(template, variables)
        try:
            print("sending")
            send_mail(subject=subject,
                      html_message=message,
                      message=strip_tags(message),
                      from_email=None,
                      recipient_list=recipient_list,
                      fail_silently=False,)
            print("sent")

        except Exception as e:
            logger.error("Failed to send EMail")
            logger.exception(e)
            raise e


class SMSPanelService:
    @staticmethod
    #  def send_sms(mobile, text, body_id, is_flash=True):
    def send_sms(mobile, args, body_id, is_flash=True):
        # # url = "https://rest.payamak-panel.com/api/SendSMS/SendSMS"
        # url = "https://rest.payamak-panel.com/api/SendSMS/BaseServiceNumber"
        # # url = "http://api.payamak-panel.com/post/Send.asmx?wsdl"
        #
        payload = {
            #  'username': SMS_PANEL_SETTINGS['SMS_PANEL_USERNAME'],
            #  'password': SMS_PANEL_SETTINGS['SMS_PANEL_PASSWORD'],
            'to': mobile,
            # 'from': SMS_PANEL_SETTINGS['SMS_PANEL_SENDER_NUMBER'],
            #  'text': text,
            'args': args,
            'bodyId': int(body_id),
            # 'isFlash': is_flash,
        }

        try:
            response = requests.post(
                f'https://console.melipayamak.com/api/send/shared/{SMS_PANEL_SETTINGS["SMS_PANEL_TOKEN"]}',
                json=payload)

            res = response.json()

            if len(str(res['recId'])) < 15:
                logger.error("Failed to send SMS, Invalid recId", extra={'result': res,
                                                                         'sms_payload': payload})

            return len(str(res['recId'])) >= 15
        except Exception as e:
            logger.error("Failed to send SMS", extra={'sms_payload': payload})
            logger.exception(e)
            return False
