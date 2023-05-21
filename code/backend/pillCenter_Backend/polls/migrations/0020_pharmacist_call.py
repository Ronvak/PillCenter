# Generated by Django 4.1.7 on 2023-05-19 11:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('polls', '0019_medicine_is_prescription_alter_medicine_description_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pharmacist_Call',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=200)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('disapproved', 'Disapproved')], default='pending', max_length=20)),
                ('instructions', models.CharField(default=None, max_length=500)),
                ('anamnesis', models.CharField(default=None, max_length=500)),
                ('patient', models.ForeignKey(default=3, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('pharmacist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pharmacist', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]