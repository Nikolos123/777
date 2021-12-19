window.onload = function () {
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

    // var csrf = $('meta[name="csrf-token"]').attr('content');
    // $('.card_add_basket').on('click', 'button[type="button"]', function () {
    //     let t_href = event.target.value
    //     $.ajax(
    //         {   type: 'POST',
    //             headers: {"X-CSRFToken": csrf},
    //             url: "/baskets/add/" + t_href + "/",
    //             success: function (data) {
    //                 $('.card_add_basket').html(data.result)
    //                 alert('товар добавлен вы корзину')
    //             },
    //         });
    //     event.preventDefault()
    //
    // })


}