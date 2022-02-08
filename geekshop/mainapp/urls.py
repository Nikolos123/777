
from django.urls import path
from django.views.decorators.cache import cache_page

from mainapp.views import products, ProductDetail

app_name = 'mainapp'
urlpatterns = [

    path('', products,name='products'),
    path('category/<int:id_category>', products, name='category'),
    # path('page/<int:page>', cache_page(3600)(products), name='page'),
    path('page/<int:page>', products, name='page'),
    path('detail/<int:pk>/', ProductDetail.as_view(), name='detail'),
]
