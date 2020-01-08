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

    controlPanel.getControl(CONTROLS.download.video.frames).on('click', function(){
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
        charrambaCore.exportVideoToFrames(function (frames) {

            var zip = new JSZip();
            zip.file("README-Charramba.txt", "Images generated with Charramba Glitch Generator\nCreated by tajny_projekt\n2020\n");
            var zipImages = zip.folder("frames");

            for (var i = 0; i < frames.length; i++) {
                zipImages.file('glitched-' + i + '.png', frames[i].blob, {base64: true});
            }

            zip.generateAsync({type:"blob"})
                .then(function(content) {
                    var a = document.createElement('a');
                    document.body.append(a);
                    a.download = name + "-frames.zip";
                    a.href = URL.createObjectURL(content);
                    a.click();
                    a.remove();
                    clearInterval(waitInterval);
                    button.html(label);
                    button.attr('disabled', false);
                });
        });
    });

});