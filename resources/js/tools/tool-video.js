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
    // $.timeline('resize', 300, 100);

    controlPanel.getControl(CONTROLS.video.button).on('click', function () {
        $('#video-editor-modal').modal('show').on('hidden.bs.modal', function () {
            // on close
        });
        // $('.video-editor__timeline').timeline('resize', 100, 300);

    });

    //TODO: remove -development only
    // controlPanel.getControl(CONTROLS.video.button).click();

    controlPanel.getControl(CONTROLS.video.play).on('click', function(){
       charrambaCore.setVideoTime(0);
       charrambaCore.setVideoPlaying(true);
    });

    controlPanel.getControl(CONTROLS.video.pause).on('click', function(){
        charrambaCore.setVideoPlaying(false);
    });

    controlPanel.getControl(CONTROLS.video.download).on('click', function(){
        charrambaCore.exportVideo();
    });


    // on modal

    automationTimeline.renderPropsSelect(document.getElementById('video-animation-parameter-select-container'));

    controlPanel.getControl(CONTROLS.video.animateParameter).on('click', function(){
        var prop = controlPanel.getControlValue(CONTROLS.video.animateParameterSelect);
        automationTimeline.addAutomationRow(parseInt(prop));

    });



});