$(function() {

    $('#text-input').val('');

    $('.controls-section-header').on('click',function () {
        $(this).find('.collapse-icon').toggleClass('up');
        $(this).next().slideToggle();
    });

    $('.text-align-icon').on('click', function () {
        $('.text-align-icon').removeClass('selected');
        $(this).addClass('selected');
    });

    $('.text-style-icon').on('click', function () {
        if ($(this).hasClass('selected')) {<div class="w-100 header-bar">…</div>
            $(this).toggleClass('selected');<div class="w-100 header-bar">…</div>
        }<div class="w-100 header-bar">…</div>
        else {
            $('.text-style-icon').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#canvas-container').on('click', function () {
        $('#text-input').focus();
        hideInitialMessage();
        console.log('focus');
    });

    $('#canvas-wrapper').resize(function () {
        console.log('im resizing!');
    });
});

function openColorPicker() {
    $('#color-picker').click();
}

function updateColorButton(value) {
    $('#color-button').css({
        'background': value,
        'color': adjustFontColor(value)
    });
}

function adjustFontColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16);
    color = color > 0x888888 ? 0 : 0xffffff;
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color;
    return color;
}