# Generated by Django 4.1.7 on 2023-04-25 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0014_remove_orders_machine_id_remove_orders_medicine_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='orders',
            name='qr_code',
            field=models.ImageField(default=None, upload_to='qr_codes'),
        ),
    ]
