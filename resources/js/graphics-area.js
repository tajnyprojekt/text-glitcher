var graphicsArea;

$(function() {

    graphicsArea = {
        panzoomController: null,

        init: function () {
            var area = $('.graphics-area__canvas-wrapper').get(0);
            this.panzoomController = panzoom(area, {
                maxZoom: 5,
                minZoom: 0.3
            });
            this.adjustPanzoomToCenter();
        },

        adjustPanzoomToCenter: function () {
            var $area = $('.graphics-area');
            var $wrapper = $('.graphics-area__canvas-wrapper');
            var scale = this.panzoomController.getTransform().scale;

            if ($wrapper.width() < charrambaParams.canvas.width || $wrapper.height() < charrambaParams.canvas.height ) {
                var ratio = $area.width() / charrambaParams.canvas.width;
                var zoomedImageHeight = $wrapper.height() * ratio;
                var centeredY = $area.height() / 2 - zoomedImageHeight / 2;
                this.panzoomController.moveTo(0, centeredY);
                this.panzoomController.zoomAbs(0, centeredY, ratio);
            }
            else {
                this.panzoomController.moveTo(0, 0);
                this.panzoomController.zoomAbs(0, 0, 1);
            }
        }
    };

    graphicsArea.init();


    // panzoomController.zoomAbs(0, 0, 0);
    console.log(graphicsArea.panzoomController);

    document.body.addEventListener('panstart', function(e) {
        console.log('pan start', graphicsArea.panzoomController.getTransform());
    }, true);

    document.body.addEventListener('panend', function(e) {
        console.log('pan end', graphicsArea.panzoomController.getTransform());
    }, true);


});