window.onload = function () {

    $('.ajax_change select').change(function () {
        let lang = document.getElementById("language_site")
        lang.type = "submit";
        $('#language_site').trigger('click');
        lang.type = "hidden";
    });
}