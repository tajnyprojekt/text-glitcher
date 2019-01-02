$(function() {

    // text input

    controlPanel.getControl(CONTROLS.text.input).on('input', function () {
        var text = $(this).val();
        charrambaCore.setText(text);
    });

    // style

    $('.buttons-bar__section-1').on('click', function () {
        var wasSelected = $(this).hasClass('selected');
        var dataFunction = $(this).data('function');
        $(this).toggleClass('selected');

        if (wasSelected) {
            if (dataFunction === CONTROLS.text.style.bold) {
                charrambaCore.setFontWeightNormal();
            }
            if (dataFunction === CONTROLS.text.style.italic) {
                charrambaCore.setFontStyleNormal();
            }
        }
        else {
            if (dataFunction === CONTROLS.text.style.bold) {
                charrambaCore.setFontWeightBold();
            }
            if (dataFunction === CONTROLS.text.style.italic) {
                charrambaCore.setFontStyleItalic();
            }
        }
    });

    $('.buttons-bar__section-2').on('click', function () {
        var dataFunction = $(this).data('function');
        $('.buttons-bar__section-2').removeClass('selected');
        $(this).addClass('selected');
        if (dataFunction === CONTROLS.text.align.left) {
            charrambaCore.setTextAlignLeft();
        }
        if (dataFunction === CONTROLS.text.align.center) {
            charrambaCore.setTextAlignCenter();
        }
        if (dataFunction === CONTROLS.text.align.right) {
            charrambaCore.setTextAlignRight();
        }
    });

    controlPanel.getControl(CONTROLS.text.size).attr({
        min: charrambaParamsBounds.text.size.min,
        max: charrambaParamsBounds.text.size.max,
        value: charrambaCore.getParams().text.size,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var size = $(this).val();
        charrambaCore.setTextSize(size);
        controlPanel.setControlValue(CONTROLS.text.lineHeight, size);
    });

    controlPanel.getControl(CONTROLS.text.lineHeight).attr({
        min: charrambaParamsBounds.text.lineHeight.min,
        max: charrambaParamsBounds.text.lineHeight.max,
        value: charrambaCore.getParams().text.lineHeight,
        step: 1
    })
    .trigger('change')
    .on('change input', function () {
        var lineHeight = $(this).val();
        charrambaCore.setTextLineHeight(lineHeight);
    });

});