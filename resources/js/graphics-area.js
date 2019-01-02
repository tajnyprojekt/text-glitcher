var graphicsArea;

$(function() {

    graphicsArea = {
        zoom: 1,
        panzoomController: null,

        init: function () {
            var area = $('.graphics-area__canvas-wrapper').get(0);
            this.panzoomController = panzoom(area, {
                maxZoom: charrambaParamsBounds.canvas.zoom.max,
                minZoom: charrambaParamsBounds.canvas.zoom.min
            });
            this.adjustPanzoomToCenter();
        },

        adjustPanzoomToCenter: function () {
            var $area = $('.graphics-area');
            var $wrapper = $('.graphics-area__canvas-wrapper');

            if ($wrapper.width() < charrambaCore.getParams().canvas.width || $wrapper.height() < charrambaCore.getParams().canvas.height ) {
                var ratio = $area.width() / charrambaCore.getParams().canvas.width;
                var zoomedImageHeight = $wrapper.height() * ratio;
                var centeredY = $area.height() / 2 - zoomedImageHeight / 2;
                this.panzoomController.moveTo(0, centeredY);
                this.panzoomController.zoomAbs(0, centeredY, ratio);
                this.zoom = ratio;
            }
            else {
                this.panzoomController.moveTo(0, 0);
                this.panzoomController.zoomAbs(0, 0, 1);
                this.zoom = 1;
            }
        },

        setZoom: function (zoomAmount) {
            var currentTransform = this.panzoomController.getTransform();
            this.panzoomController.zoomAbs(currentTransform.x, currentTransform.y, zoomAmount);
        }
    };


    graphicsArea.init();

    document.body.addEventListener('zoom', function(e) {
        var zoomAmount = graphicsArea.panzoomController.getTransform().scale.toFixed(1);
        $(controlPanel.getControl(CONTROLS.canvas.zoom.amount)).val(zoomAmount);
        $(controlPanel.getControlValueLabelByControl(CONTROLS.canvas.zoom.amount)).text(zoomAmount);
    }, true);

});