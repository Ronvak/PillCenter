from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(
    User, on_delete=models.CASCADE, related_name='profile')
    User._meta.get_field('email')._unique = True
    id_user = models.CharField(max_length=9,default=0 ,unique=True)
    phone = models.CharField(max_length=20)



class Medicine(models.Model):
    prescription = models.CharField(max_length=50)
    image_URL = models.CharField(max_length=400)
    price = models.FloatField(default=0)
    brand = models.CharField(max_length=30)
    description = models.CharField(max_length=50)
    medicine_name = models.CharField(default="", max_length=30)


class Products(models.Model):
    medicine_id = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    expired_date = models.DateField()


class Order_status(models.Model):
    status = models.CharField(max_length=20)


class Orders(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE)
    order_status = models.ForeignKey(Order_status, on_delete=models.CASCADE)
    order_date = models.DateField()
    pharmacist_instruction = models.CharField(max_length=300)


class Vending_machines(models.Model):
    address = models.CharField(max_length=30)
    city = models.CharField(max_length=30)


class Inventory(models.Model):
    machine_id = models.ForeignKey(Vending_machines, on_delete=models.CASCADE)
    product_id = models.OneToOneField(Products, on_delete=models.CASCADE)


def __str__(self):
    return self.user.username
