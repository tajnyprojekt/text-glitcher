$(function() {



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