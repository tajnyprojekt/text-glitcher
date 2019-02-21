var tutorial;

$(function() {

    var template = '<div class=\'tutorial popover tour\'>\n' +
                   '  <div class=\'arrow\'></div>\n' +
                   '  <h3 class=\'popover-title\'></h3>\n' +
                   '  <div class=\'popover-content\'></div>\n' +
                   '  <div class=\'popover-navigation\'>\n' +
                   '      <button class=\'button tour-prev-button\' data-role=\'prev\'>« Prev</button>\n' +
                   '      <button class=\'button tour-next-button\' data-role=\'next\'>Next »</button>\n' +
                   '      <button class=\'button\' data-role=\'end\'>End tour</button>\n' +
                   '  </div>\n' +
                   '</div>';

    var tutorial = new Tour({
        template: template,
        steps: [
            {
                orphan: true,
                // element: '#canvas-container canvas',
                title: 'Ayyy <b>Charramba</b>!',
                content: 'Welcome to our editor.<br> You can create glitched typography images or animations. It\'s all dedicated to your creativity!<br><br>We encourage You to do this little tutorial to become the Glitching Expert : )',
                onShown: function () {
                    $('.tour-prev-button').hide();
                }
            },
            {
                element: '#canvas-container canvas',
                title: 'The Workspace.',
                content: 'This is your Canvas - drag with mouse to pan it and scroll to zoom.<br>You can also click on it and start typing to input some text. ',
                onShown: function () {
                    $('.tour-prev-button').hide();
                }
            },
            {
                element: selector(CONTROLS.text.input),
                title: 'Text input',
                content: 'If You haven\'t already - type some text! <br>Here You have more control over your message.',
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
                content: 'That\'s right! Charramba is now also a video editor! Click here to open the editor and see how easy it is.',
                onShow: function () {
                    $('[data-tool=video]').click();
                },
                onNext: function (tour) {
                    tour.end();
                    $('#video-editor-modal').modal('show');
                    setTimeout(function(){
                        tour.restart();
                        tour.goTo(11);
                    }, 500);
                }
            },
            {
                element: selector(CONTROLS.video.animateParameterSelect),
                title: 'Tadaam !',
                content: 'Select the parameter You want to animate and click <i>add</i> to add it to the timeline.',
                onShow: function (tour) {
                    if (!$('#video-editor-modal').hasClass('show')) {
                        tour.end();
                        $('#video-editor-modal').modal('show');
                        setTimeout(function(){
                            tour.restart();
                            tour.goTo(11);
                        }, 500);
                    }
                },
                onNext: function (tour) {
                    tour.end();
                    controlPanel.getControl(CONTROLS.video.animateParameter).click();
                    setTimeout(function(){
                        tour.restart();
                        tour.goTo(12);
                    }, 500);
                }
            },
            {
                element: '.video-editor__sequencer__row',
                title: 'The Timeline',
                content: 'Click on the area to add nodes, drag them and double click to remove.<br>The line between nodes shows how the value will be changing in time. <br>Remove parameter from animation with cross in upper-right corner.',
                onShow: function (tour) {
                    if (!$('#video-editor-modal').hasClass('show')) {
                        tour.end();
                        $('#video-editor-modal').modal('show');
                        setTimeout(function(){
                            controlPanel.getControl(CONTROLS.video.animateParameter).click();
                            setTimeout(function(){
                                tour.restart();
                                tour.goTo(12);
                            }, 500);
                        }, 500);
                    }
                },
            },
            {
                element: selector(CONTROLS.video.durationPlus),
                title: 'Video duration',
                content: 'You can also set the video duration.',
                onShow: function (tour) {
                    if (!$('#video-editor-modal').hasClass('show')) {
                        tour.end();
                        $('#video-editor-modal').modal('show');
                        setTimeout(function(){
                            tour.restart();
                            tour.goTo(13);
                        }, 500);
                    }
                },
                onNext: function () {
                    $('#video-editor-modal').modal('hide');
                }
            },
            {
                element: selector(CONTROLS.video.pause),
                title: 'Control the playback.',
                content: 'Use these buttons to loop, play and pause your animation preview.',
                onShow: function () {
                    $('[data-tool=video]').click();
                }
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
                content: 'We appreciate your encouragement in our app - send us feedback, suggestions or bug reports to <b>hello@tajnyprojekt.com</b>.<br><br>Enjoy Charramba!<br>Ayy Charramba!',
                onShow: function () {
                    $('[data-tool=info]').click();
                },
                onShown: function () {
                    $('.tour-next-button').hide();
                },
                onNext: function (tour) {
                    tour.end();
                }
            }
        ]});

    function selector(control) {
        return '[data-function=' + control + ']'
    }

    var isLarge = $(window).width() > 992;

    if (isLarge) {
        tutorial.init();
        tutorial.start();
    }
    else {
        $('#show-tutorial').hide();
    }

    $('#show-tutorial').on('click', function () {
        tutorial.restart();
        charrambaCore.resetParams();
    });

});