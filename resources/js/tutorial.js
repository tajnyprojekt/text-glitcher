var tutorial;

$(function() {

    var template = '<div class=\'tutorial popover tour\'>\n' +
                   '  <div class=\'arrow\'></div>\n' +
                   '  <h3 class=\'popover-title\'></h3>\n' +
                   '  <div class=\'popover-content\'></div>\n' +
                   '  <div class=\'popover-navigation\'>\n' +
                   '      <button class=\'button\' data-role=\'prev\'>« Prev</button>\n' +
                   '      <button class=\'button\' data-role=\'next\'>Next »</button>\n' +
                   '      <button class=\'button\' data-role=\'end\'>End tour</button>\n' +
                   '  </div>\n' +
                   '</div>';

    var tutorial = new Tour({
        template: template,
        steps: [
            {
                element: selector(CONTROLS.text.input),
                title: 'Text input',
                content: 'First of all type some text!',
                onShow: function () {
                    $('[data-tool=text]').click();
                },
            },
            {
                element: selector(CONTROLS.text.size),
                title: 'Text style',
                content: 'You can adjust text size and other styles.'
            },
            {
                element: selector(CONTROLS.canvas.size.helpers.widthPlus),
                title: 'Canvas settings',
                content: 'Here You can change canvas size and color.',
                onShow: function () {
                    $('[data-tool=canvas]').click();
                }
            },
            {
                element: selector(CONTROLS.canvas.zoom.amount),
                title: 'Zoom',
                content: 'Adjust and reset zoom if You get lost.'
            },
            {
                element: selector(CONTROLS.form.liquid.enabled),
                title: 'The goodies',
                content: 'This is what Charramba is all about. Glitches, blurs and distortions. <br>Toggle effects with corresponding checkbox.',
                onShow: function () {
                    $('[data-tool=form]').click();
                }
            },
            {
                element: selector(CONTROLS.form.liquid.dissolveX),
                title: 'The Liquid Effect',
                content: 'Use this effect to splash your text a little. <br> Adjust values by moving a slider. '
            },
            {
                element: selector(CONTROLS.form.wave.size),
                title: 'The Wave Effect',
                content: 'Use this effect if You like sinusoidal glitches : )'
            },
            {
                element: selector(CONTROLS.form.blur.amount),
                title: 'The Blur Effect etc',
                content: 'You can also use Blur, Pixel and Scraped effects to add some flavour...'
            },
            {
                element: selector(CONTROLS.video.button),
                title: 'Video tool',
                content: 'That\'s right! Charramba is now also a video editor! Click here to open the editor.',
                onShow: function () {
                    $('[data-tool=video]').click();
                },
                onNext: function (tour) {
                    tour.end();
                    $('#video-editor-modal').modal('show');
                    setTimeout(function(){
                        tour.restart();
                        tour.goTo(9);
                    }, 500);
                }
            },
            {
                element: selector(CONTROLS.video.animateParameterSelect),
                title: 'Tadaam !',
                content: 'Select the parameter You want to animate and click <i>add</i> to add to to the timeline.',
                onNext: function (tour) {
                    tour.end();
                    controlPanel.getControl(CONTROLS.video.animateParameter).click();
                    setTimeout(function(){
                        tour.restart();
                        tour.goTo(10);
                    }, 500);
                }
            },
            {
                element: '.video-editor__sequencer__row',
                title: 'The Timeline',
                content: 'Click on the area to add nodes, drag them and double click to remove.<br>The line between nodes shows how the value will be changing in time. <br>Remove parameter from animation with cross in upper-right corner.',
            },
            {
                element: selector(CONTROLS.video.durationPlus),
                title: 'Video duration',
                content: 'You can also set the video duration.',
                onHidden: function () {
                    $('#video-editor-modal').modal('hide');
                    $('[data-tool=video]').click();
                }
            },
            {
                element: selector(CONTROLS.video.pause),
                title: 'Control the playback.',
                content: 'Use these buttons to loop, play and pause your animation.',
            },
            {
                element: selector(CONTROLS.download.image.button),
                title: 'Download your masterpiece !',
                content: 'You can download your work as an image or video.',
                onShow: function () {
                    $('[data-tool=download]').click();
}
            },
            {
                element: '#show-tutorial',
                title: 'Congratulation! Thats all!',
                content: 'We appreciate your encouragement in our app - send us feedback, suggestions or bug reports to <b>hello@tajnyprojekt.com</b>.',
                onShow: function () {
                    $('[data-tool=info]').click();
                },
                onNext: function (tour) {
                    tour.end();
                }
            }
        ]});

    function selector(control) {
        return '[data-function=' + control + ']'
    }

    tutorial.init();
    tutorial.start();

    $('#show-tutorial').on('click', function () {
        tutorial.restart();
        charrambaCore.resetParams();
    });

});