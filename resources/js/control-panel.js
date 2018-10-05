$(function() {

    // show selected tool menu
    $('.js-tool-button').on('click', function () {
        var tool = $(this).data('tool');
        var menuItem = $('.js-tool-menu[data-tool="' + tool + '"]');
        var wasOpened = menuItem.hasClass('opened');
        $('.js-tool-menu').removeClass('opened');

        if (!wasOpened) {
            menuItem.addClass('opened');
        }
    });

});