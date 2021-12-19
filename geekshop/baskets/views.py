from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.template.loader import render_to_string

from baskets.models import Basket
from mainapp.models import Product

@login_required
def basket_add(request,id):
    user_select = request.user
    product = Product.objects.get(id=id)
    baskets = Basket.objects.filter(user=user_select,product=product)
    if baskets:
        basket = baskets.first()
        basket.quantity +=1
        basket.save()
    else:
        Basket.objects.create(user=user_select,product=product,quantity=1)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

# @login_required
# def basket_add(request,id):
#     if request.is_ajax():
#         user_select = request.user
#         product = Product.objects.get(id=id)
#         baskets = Basket.objects.filter(user=user_select,product=product)
#         if baskets:
#             basket = baskets.first()
#             basket.quantity +=1
#             basket.save()
#         else:
#             Basket.objects.create(user=user_select,product=product,quantity=1)
#         products = Product.objects.all()
#         context = {'products': products}
#         result = render_to_string('mainapp/includes/card.html', context)
#         return JsonResponse({'result': result})

@login_required
def basket_remove(request,basket_id):
    Basket.objects.get(id=basket_id).delete()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))

@login_required
def basket_edit(request,id_basket,quantity):
    if request.is_ajax():
        basket = Basket.objects.get(id=id_basket)
        if quantity > 0:
            basket.quantity = quantity
            basket.save()
        else:
            basket.delete()

        baskets = Basket.objects.filter(user=request.user)
        context = {'baskets':baskets}
        result = render_to_string('baskets/basket.html',context)
        test = JsonResponse({'result':result})
        return test