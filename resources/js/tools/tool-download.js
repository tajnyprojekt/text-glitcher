$(function() {

    controlPanel.getControl(CONTROLS.download.image.button).on('click', function () {
        var name = controlPanel.getControl(CONTROLS.download.image.name).val();
        var extension = controlPanel.getControl(CONTROLS.download.image.extension).val();
        charrambaCore.downloadImage(name, extension);
    });

    controlPanel.getControl(CONTROLS.download.video.button).on('click', function(){
        var name = controlPanel.getControl(CONTROLS.download.video.name).val();
        charrambaCore.exportVideo(name);
    });

});