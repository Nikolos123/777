window.onload = function () {

    let quantity, price, orderitem_num, delta_quantity, orderitem_quantity, delta_cost

    let quantity_arr = []
    let price_arr = []

    let total_forms = parseInt($('input[name=orderitems-TOTAL_FORMS]').val())
    // console.log(total_forms)

    let order_total_quantity = parseInt($('.order_total_quantity').text()) || 0;
    let order_total_cost = parseInt($('.order_total_cost').text().replace(',', '.')) || 0;

    // console.log(order_total_quantity)
    // console.log(order_total_cost)

    for (let i = 0; i < total_forms; i++) {
        quantity = parseInt($('input[name=orderitems-' + i + '-quantity]').val())
        price = parseInt($('.orderitems-' + i + '-price').text().replace(',', '.'))

        quantity_arr[i] = quantity;
        if (price) {
            price_arr[i] = price;
        } else {
            price_arr[i] = 0;
        }
    }

    console.info('QUANTITY', quantity_arr)
    console.info('PRICE', price_arr)


    //1 метод
    $('.order_form').on('click', 'input[type=number]', function () {
            let target = event.target
            orderitem_num = parseInt(target.name.replace('orderitems-', '').replace('-quantity', ''));
            if (price_arr[orderitem_num]) {
                orderitem_quantity = parseInt(target.value);
                delta_quantity = orderitem_quantity - quantity_arr[orderitem_num];
                quantity_arr[orderitem_num] = orderitem_quantity;
                orderSummaryUpdate(price_arr[orderitem_num], delta_quantity)
            }
        }
    )


    //2 метод
    $('.order_form').on('click', 'input[type=checkbox]', function () {
            let target = event.target
            orderitem_num = parseInt(target.name.replace('orderitems-', '').replace('-DELETE', ''));
            if (target.checked) {
                delta_quantity = -quantity_arr[orderitem_num]

            } else {
                delta_quantity = quantity_arr[orderitem_num];
            }
            orderSummaryUpdate(price_arr[orderitem_num], delta_quantity)
        }
    );


    function orderSummaryUpdate(orderitem_price, delta_quantity) {
        delta_cost = orderitem_price * delta_quantity;
        order_total_cost = Number((order_total_cost + delta_cost).toFixed(2))
        order_total_quantity = order_total_quantity + delta_quantity

        $('.order_total_quantity').html(order_total_quantity.toString());
        $('.order_total_cost').html(order_total_cost.toString() + ',00');

    }


    $('.formset_row').formset({
        addText: 'добавить продукт',
        deleteText: 'Удалить',
        prefix: 'orderitems',
        removed: deleteOrderItem,
    });


    function deleteOrderItem(row) {
        let target_name = row[0].querySelector('input[type="number"]').name
        orderitem_num = parseInt(target_name.replace('orderitems-', '').replace('-quantity', ''));
        delta_quantity = -quantity_arr[orderitem_num]
        orderSummaryUpdate(price_arr[orderitem_num], delta_quantity)
    }


    $(document).on('change', '.form-control', function () {


        let target = event.target;
        orderitem_num = parseInt(target.name.replace('orderitems-', '').replace('-product', ''));
        let orderitem_product_pk = target.options[target.selectedIndex].value;


        console.log(orderitem_num)
        console.log(orderitem_product_pk)

        if (orderitem_product_pk) {

            $.ajax({
                url: '/orders/product/' + orderitem_product_pk + '/price/',
                success: function (data) {

                    if (data.price) {
                        price_arr[orderitem_num] = parseFloat(data.price)
                        if (isNaN(quantity_arr[orderitem_num])) {
                            quantity_arr[orderitem_num] = 0;
                        }
                        let price_html = '<span class="orderitems-' + orderitem_num + '-price">'
                            + data.price.toString().replace('.', ',') + '</span> руб';
                        let current_tr = $('.order_form table').find('tr:eq(' + (orderitem_num + 1) + ')');
                        current_tr.find('td:eq(2)').html(price_html)

                    }
                }
            })

        }


    })


    $('.basket_list').on('click', 'input[type="number"]', function () {
        let t_href = event.target
        $.ajax(
            {
                url: "/baskets/edit/" + t_href.name + "/" + t_href.value + "/",
                success: function (data) {
                    $('.basket_list').html(data.result)
                },
            });
        event.preventDefault()
    })

    $('.card_add_basket').on('click', 'button[type="button"]', function () {
        let t_href = event.target.value
        $.ajax(
            {
                url: "/baskets/add/" + t_href + "/",
                success: function (data) {
                    $('.card_add_basket').html(data.result)
                    alert('товар добавлен вы корзину')
                },
            });
        event.preventDefault()
        //
    })


}