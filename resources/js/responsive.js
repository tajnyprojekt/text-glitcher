$(function() {

    var responsive = {
        checkWidth: function () {
            var windowWidth = $(window).width();

            if (windowWidth < 768) {

            }
            if (windowWidth >= 768) {

            }
        }
    };

    responsive.checkWidth();
    $(window).resize(responsive.checkWidth);

});