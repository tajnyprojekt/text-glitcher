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
        min: graphicsArea.minZoom,
        max: graphicsArea.maxZoom,
        step: (graphicsArea.maxZoom - graphicsArea.minZoom) / 100,
        value: 1
    }).on('change input', function () {
        var value = $(this).val();
        graphicsArea.setZoom(value);
    });

    controlPanel.getControl(CONTROLS.canvas.zoom.reset).on('click', function () {
        graphicsArea.adjustPanzoomToCenter();
        controlPanel.setControlValue(CONTROLS.canvas.zoom.amount, graphicsArea.zoom);
    });

});