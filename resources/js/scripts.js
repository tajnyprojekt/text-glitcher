$(function() {

    $('.controls-section-header').on('click',function () {
        $(this).find('.collapse-icon').toggleClass('up');
        $(this).next().slideToggle();
    });
});