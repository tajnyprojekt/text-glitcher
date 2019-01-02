$(function() {

    controlPanel.getControl(CONTROLS.download.button).on('click', function () {
        var name = controlPanel.getControl(CONTROLS.download.name).val();
        var extension = controlPanel.getControl(CONTROLS.download.extension).val();
        charrambaCore.downloadImage(name, extension);
    });

});