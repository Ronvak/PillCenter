from django.core.mail import send_mail 
from django.template.loader import render_to_string


def send_mail_order(user , order):
    user.save()
    
    msg_plain = render_to_string('orderSummary/order_mail.txt', {'user': user , 'order': order  })
    msg_html = render_to_string('orderSummary/order_mail.html', {'user': user , 'order': order  })
    
    send_mail(
        'אישור הזמנה PillCenter',
        msg_plain,
        'pillcenterdev@gmail.com',
        [user.email],
        html_message=msg_html,
    )
    