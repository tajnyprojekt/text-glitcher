var charrambaCore;

$(function() {

    // define sketch object
    var sketch = function(p) {

        var canvas;
        var redraw;

        p.setup = function () {
            canvas = p.createCanvas(charrambaParams.canvas.width, charrambaParams.canvas.height);
            p.clear();
        };

        p.draw = function () {
            if (redraw) {
                p.background(
                    charrambaParams.canvas.color.r,
                    charrambaParams.canvas.color.g,
                    charrambaParams.canvas.color.b,
                    charrambaParams.canvas.color.a
                );
                p.clear();
                redraw = false;
            }
        };

        p.paramsChanged = function () {
            redraw = true;
        };

        p.setWidth = function (newWidth) {
            charrambaParams.canvas.width = newWidth;
            p.resizeCanvas(newWidth, charrambaParams.canvas.height);
            p.paramsChanged();
        };

        p.setHeight = function (newHeight) {
            charrambaParams.canvas.height = newHeight;
            p.resizeCanvas(charrambaParams.canvas.width, newHeight);
            p.paramsChanged();
        };

        p.setBackgroundColor = function (r, g, b, a) {
            charrambaParams.canvas.color.r = r;
            charrambaParams.canvas.color.g = g;
            charrambaParams.canvas.color.b = b;
            charrambaParams.canvas.color.a = a;
            p.paramsChanged();
        }
    };

    // init p5 sketch
    var canvasContainer = document.getElementById('canvas-container');
    charrambaCore = new p5(sketch, canvasContainer);

});