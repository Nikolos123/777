from django.test import TestCase
from mainapp.models import ProductCategory,Product
from django.test.client import Client

# Create your tests here.

class TestMainSmokeTest(TestCase):

    def setUp(self) -> None:
        category = ProductCategory.objects.create(name='Test')
        Product.objects.create(category=category,name='product_1',price=100)

        self.client = Client()

    def test_product_pages(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code,200)

    def test_product_product(self):
        for product_item in Product.objects.all():
            response = self.client.get(f'/products/detail/{product_item.pk}/')
            self.assertEqual(response.status_code, 200)


    def tearDown(self) -> None:
        pass