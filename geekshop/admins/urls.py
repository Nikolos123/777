
from django.urls import path
from django.views.i18n import set_language

from admins.views import IndexTemplateView, UserCreateView, UserUpdateView, UserDeleteView, UserListView, \
    CategoryListView, CategoryDeleteView, CategoryUpdateView, ProductListView, CategoryCreateView, ProductsUpdateView, \
    ProductsCreateView, ProductsDeleteView

app_name = 'admins'
urlpatterns = [

    path('', IndexTemplateView.as_view(),name='index'),
    path('users/', UserListView.as_view(),name='admin_users'),
    path('users-create/', UserCreateView.as_view(),name='admin_users_create'),
    path('users-update/<int:pk>', UserUpdateView.as_view(),name='admin_users_update'),
    path('users-delete/<int:pk>', UserDeleteView.as_view(),name='admin_users_delete'),

    path('category/', CategoryListView.as_view(), name='admin_category'),
    path('category/create/', CategoryCreateView.as_view(), name='admin_category_create'),
    path('category-delete/<int:pk>/', CategoryDeleteView.as_view(), name='admin_category_delete'),
    path('category-update/<int:pk>/', CategoryUpdateView.as_view(), name='admin_category_update'),
    # path('category-detail/<int:pk>/', CategoryDetailView.as_view(), name='admin_category_detail'),

    path('product/', ProductListView.as_view(), name='admins_product'),
    path('products-update/<int:pk>/', ProductsUpdateView.as_view(), name='admins_product_update'),
    path('products-create/', ProductsCreateView.as_view(), name='admins_product_create'),
    path('products-delete/<int:pk>/', ProductsDeleteView.as_view(), name='admins_product_delete'),

    path('lang/', set_language, name='set_language'),
]
