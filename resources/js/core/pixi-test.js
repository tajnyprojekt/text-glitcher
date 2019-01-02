var redraw;
$(function() {

    var app = new PIXI.Application({
        width: 640,
        height: 360,
        transparent: true,
        resolution: 1,
        antialias: true,
        autoStart: false
    });

    $('#container').append(app.view);


    function setup() {
        var text = new PIXI.Text('Hello Pixi\ndupa', {
            fontFamily: 'monospace',
            fontSize: 25,
            align: 'center',
            fill: 0xff1010
        });

        text.anchor.x = 0.5;
        text.anchor.y = 0.5;
        text.x = app.renderer.view.width/2;
        text.y = app.renderer.view.height/2;



        app.stage.addChild(text);

        var filter = new PIXI.filters.BlurFilter(4);
        // filter.blur = 20;
        app.stage.filters = [filter];

        //
        app.ticker.add(function () {
            console.log('ticker');
            // app.stop();
        });

    }

    redraw = function () {
        // app.renderer.render(app.stage);
        app.render();
        console.log('redraw');
    };

    setup();
});