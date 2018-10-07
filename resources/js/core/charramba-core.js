var charramba;

$(function() {

    // define sketch object
    charramba = function(p) {

        var canvas;
        var img;

        p.setup = function () {
            canvas = p.createCanvas(charrambaParams.canvas.width, charrambaParams.canvas.height);
            p.background(255);
            img = p.loadImage('./resources/img/640x360.png');

        };

        p.draw = function () {
            p.image(img, 0, 0);
        };
    };

    // init p5 sketch
    var canvasContainer = document.getElementById('canvas-container');
    var sketch = new p5(charramba, canvasContainer);

});