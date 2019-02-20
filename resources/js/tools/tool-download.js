$(function() {

    controlPanel.getControl(CONTROLS.download.image.button).on('click', function () {
        var name = controlPanel.getControl(CONTROLS.download.image.name).val();
        var extension = controlPanel.getControl(CONTROLS.download.image.extension).val();
        charrambaCore.downloadImage(name, extension);
    });

    controlPanel.getControl(CONTROLS.download.video.button).on('click', function(){
        var button = $(this);
        button.attr('disabled', true);
        var label = button.text();
        var i = 0;
        var waitInterval = setInterval(function () {
            var text = 'rendering ';
            var spin = ['/', '-', '\\', '|'];
            button.text(text + spin[i]);
            i = ++i % spin.length;
        }, 100);
        var name = controlPanel.getControl(CONTROLS.download.video.name).val();
        charrambaCore.exportVideo(name, function () {
            clearInterval(waitInterval);
            button.text(label);
            button.attr('disabled', false);
        });
    });

});