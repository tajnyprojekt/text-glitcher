$(function() {

    $('#text-input').val('');

    $('.controls-section-header').on('click',function () {
        $(this).find('.collapse-icon').toggleClass('up');
        $(this).next().slideToggle();
    });

    $('#canvas-container').on('click', function () {
        $('#text-input').focus();
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