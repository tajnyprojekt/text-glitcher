$(function() {



    $('#video-editor-modal').on('shown.bs.modal', function () {
        $('#timeline').timeline({
            fgColor: '#666666',
            ptColor: '#e6e6e6',
            points: [[0, 0.5]]
        });

        $('#timeline').bind('change', function() {
            var points = $("#timeline").timeline().getPoints();
            if (typeof(points) !== undefined && points.length > 0) {
                videoEditor.params.automations[0].points = points;
                console.log( 'points',points)
            }
        });

    });

    $('.video-timeline-tip').hide();

    // $.timeline('resize', 300, 100);

    controlPanel.getControl(CONTROLS.video.button).on('click', function () {
        $('#video-editor-modal').modal('show').on('hidden.bs.modal', function () {
            // on close
        });
        // $('.video-editor__timeline').timeline('resize', 100, 300);

    });

    //TODO: remove -development only
    // controlPanel.getControl(CONTROLS.video.button).click();

    var playEndTimeout;

    controlPanel.getControl(CONTROLS.video.loop).on('click', function(){
        charrambaCore.setVideoTime(0);
        charrambaCore.setVideoStateLoop();
        updatePlaybackButtons(this);
        clearTimeout(playEndTimeout);
    });

    controlPanel.getControl(CONTROLS.video.play).on('click', function(){
       charrambaCore.setVideoTime(0);
       charrambaCore.setVideoStatePlay();
        updatePlaybackButtons(this);
        playEndTimeout = setTimeout(function () {
            $('.video-editor__playback-button').removeClass('selected');
        }, charrambaCore.getParams().video.duration);
    });

    controlPanel.getControl(CONTROLS.video.pause).on('click', function(){
        charrambaCore.setVideoStatePause();
        $('.video-editor__playback-button').removeClass('selected');
        clearTimeout(playEndTimeout);
    });

    function updatePlaybackButtons (clicked) {
        $('.video-editor__playback-button').removeClass('selected');
        $(clicked).addClass('selected');
    }

    // on modal

    // duration
    controlPanel.getControl(CONTROLS.video.duration).attr({
        min: charrambaParamsBounds.video.duration.min,
        max: charrambaParamsBounds.video.duration.max,
        value: charrambaCore.getParams().video.duration / 1000,
        step: 1
    }).on('change input', function () {
        var value = $(this).val();
        charrambaCore.setVideoDuration(value * 1000);
    });

    controlPanel.getControl(CONTROLS.video.durationMinus).on('click', function () {
        controlPanel.getControl(CONTROLS.video.duration)[0].stepDown();
        controlPanel.getControl(CONTROLS.video.duration).trigger('change');
    });

    controlPanel.getControl(CONTROLS.video.durationPlus).on('click', function () {
        controlPanel.getControl(CONTROLS.video.duration)[0].stepUp();
        controlPanel.getControl(CONTROLS.video.duration).trigger('change');
    });


    // animate parameter

    automationTimeline.renderPropsSelect(document.getElementById('video-animation-parameter-select-container'));

    controlPanel.getControl(CONTROLS.video.animateParameter).on('click', function(){
        var prop = controlPanel.getControlValue(CONTROLS.video.animateParameterSelect);
        automationTimeline.addAutomationRow(parseInt(prop));

    });





});