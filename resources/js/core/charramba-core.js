var charrambaCore;

$(function() {

    // define sketch object
    var sketch = function(p) {

        var params = {
            canvas: {
                width: 640,
                height: 360,
                color: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 0
                }
            }
        };

        var canvas;
        var redraw;

        p.setup = function () {
            canvas = p.createCanvas(params.canvas.width, params.canvas.height);
            p.clear();
        };

        p.draw = function () {
            if (redraw) {
                p.background(
                    params.canvas.color.r,
                    params.canvas.color.g,
                    params.canvas.color.b,
                    params.canvas.color.a
                );
                redraw = false;
            }
        };

        p.paramsChanged = function () {
            redraw = true;
        };

        p.setWidth = function (newWidth) {
            params.canvas.width = newWidth;
            p.resizeCanvas(newWidth, params.canvas.height);
            p.paramsChanged();
        };

        p.setHeight = function (newHeight) {
            params.canvas.height = newHeight;
            p.resizeCanvas(params.canvas.width, newHeight);
            p.paramsChanged();
        };

        p.setBackgroundColor = function (r, g, b, a) {
            params.canvas.color.r = r;
            params.canvas.color.g = g;
            params.canvas.color.b = b;
            params.canvas.color.a = a;
            p.paramsChanged();
        };

        p.getParams = function () {
            return params;
        };
    };

    // init p5 sketch
    var canvasContainer = document.getElementById('canvas-container');
    charrambaCore = new p5(sketch, canvasContainer);

});