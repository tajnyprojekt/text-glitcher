$(function() {

    // size

    controlPanel.getControl(CONTROLS.canvas.size.width).attr({
        min: charrambaParamsBounds.canvas.width.min,
        max: charrambaParamsBounds.canvas.width.max,
        value: charrambaCore.getParams().canvas.width,
        step: 1
    }).on('change input', function () {
        var value = $(this).val();
        charrambaCore.setWidth(value);
        showLargeWorkspaceWarning();
    });

    controlPanel.getControl(CONTROLS.canvas.size.helpers.widthMinus).on('click', function () {
        controlPanel.getControl(CONTROLS.canvas.size.width)[0].stepDown();
        controlPanel.getControl(CONTROLS.canvas.size.width).trigger('change');
    });

    controlPanel.getControl(CONTROLS.canvas.size.helpers.widthPlus).on('click', function () {
        controlPanel.getControl(CONTROLS.canvas.size.width)[0].stepUp();
        controlPanel.getControl(CONTROLS.canvas.size.width).trigger('change');
    });

    controlPanel.getControl(CONTROLS.canvas.size.height).attr({
        min: charrambaParamsBounds.canvas.height.min,
        max: charrambaParamsBounds.canvas.height.max,
        value: charrambaCore.getParams().canvas.height,
        step: 1
    }).on('change input', function () {
        var value = $(this).val();
        charrambaCore.setHeight(value);
        showLargeWorkspaceWarning();
    });


    controlPanel.getControl(CONTROLS.canvas.size.helpers.heightMinus).on('click', function () {
        controlPanel.getControl(CONTROLS.canvas.size.height)[0].stepDown();
        controlPanel.getControl(CONTROLS.canvas.size.height).trigger('change');
    });

    controlPanel.getControl(CONTROLS.canvas.size.helpers.heightPlus).on('click', function () {
        controlPanel.getControl(CONTROLS.canvas.size.height)[0].stepUp();
        controlPanel.getControl(CONTROLS.canvas.size.height).trigger('change');
    });

    var showLargeWorkspaceWarning = function () {
        if (charrambaCore.getParams().canvas.width > 640 || charrambaCore.getParams().canvas.height > 640) {
            $('[data-function="size-caption"]').slideDown();
        }
        else {
            $('[data-function="size-caption"]').slideUp();
        }
    };

    // zoom

    controlPanel.getControl(CONTROLS.canvas.zoom.amount).attr({
        min: charrambaParamsBounds.canvas.zoom.min,
        max: charrambaParamsBounds.canvas.zoom.max,
        step: 0.1,
        value: 1
    })
    .trigger('change')
    .on('change input', function () {
        var value = $(this).val();
        graphicsArea.setZoom(value);
    });

    controlPanel.getControl(CONTROLS.canvas.zoom.reset).on('click', function () {
        graphicsArea.adjustPanzoomToCenter();
        controlPanel.setControlValue(CONTROLS.canvas.zoom.amount, graphicsArea.zoom);
    });

});