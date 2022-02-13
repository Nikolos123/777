from time import time

from django.core.management.base import BaseCommand
from mainapp.models import Product
from django.db.models import Q


class Command(BaseCommand):
   def handle(self, *args, **options):
       # products = Product.objects.filter(
       #     Q(category__name='Обувь') | Q(id=18))

       # products = Product.objects.filter(
       #     Q(category__name='Обувь') & Q(id=5))



       # products = Product.objects.filter(
       #     ~Q(category__name='Обувь') )
       products = Product.objects.filter(
           ~Q(category__name='Обувь'), id=4)
       print(products)