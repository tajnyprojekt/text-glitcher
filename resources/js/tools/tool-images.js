$(function() {

    var $imagesContainer = $('#images-container');
    var imageUrls = [];
    var imageClass = 'images__img-thumb';

    $('.images').hide();

    controlPanel.getControl(CONTROLS.images.button).on('click', function () {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.setAttribute('multiple', true);
        input.addEventListener('change', function(e) {
            var files = e.currentTarget.files;
            console.log('selected files: ', files.length);
            $imagesContainer.html('');
            readMultipleFiles(files);
            $('.images').fadeIn();
        });
        input.click();
    });

    function readMultipleFiles(files) {
        var reader = new FileReader();
        function readFile(index) {
            if (index >= files.length) return;
            var file = files[index];
            reader.onload = function (e) {
                var dataUrl = reader.result;
                addImage(dataUrl, file[index]);
                readFile(index + 1);
            };
            reader.readAsDataURL(file);
        }
        readFile(0);
    }

    function addImage(url, name) {
        var image = document.createElement('img');
        image.classList.add(imageClass);
        image.setAttribute('data-url', url);
        image.setAttribute('data-name', name);
        image.src = url;
        // imageUrls.push(url);
        $(image).on('click', imageOnClick);
        $imagesContainer.append(image);
    }

    function imageOnClick(e) {
        setImage(e.target);
    }

    function setImage(img) {
        $('.' + imageClass).removeClass('selected');
        $(img).addClass('selected');
        charrambaCore.setText(' ');
        charrambaCore.setImage(img.src);
        setTimeout(function() {
            controlPanel.setControlValue(CONTROLS.canvas.size.width, img.naturalWidth, true);
            controlPanel.setControlValue(CONTROLS.canvas.size.height, img.naturalHeight, true);
            controlPanel.getControl(CONTROLS.canvas.zoom.reset).trigger('click');
        }, 1000);
    }

    controlPanel.getControl(CONTROLS.images.download).on('click', processAllAndDownload);

    function processAllAndDownload(e) {
        var button = $(e.target);
        button.attr('disabled', true);
        var label = button.html();
        var i = 0;
        var waitInterval = setInterval(function () {
            var text = 'processing ';
            var spin = ['/', '-', '\\', '|'];
            button.text(text + spin[i]);
            i = ++i % spin.length;
        }, 100);

        var zip = new JSZip();
        zip.file("README-Charramba.txt", "Images generated with Charramba Glitch Generator\nCreated by tajny_projekt\n2020\n");
        var zipImages = zip.folder("images");
        var $images = $('.' + imageClass);

        // recursive function processing images asynchronously and generating zip
        function processImage(index) {
            if (index >= $images.length) {
                zip.generateAsync({type:"blob"})
                    .then(function(content) {
                        var a = document.createElement('a');
                        document.body.append(a);
                        a.download = "charramba-images.zip";
                        a.href = URL.createObjectURL(content);
                        a.click();
                        a.remove();
                        clearInterval(waitInterval);
                        button.html(label);
                        button.attr('disabled', false);
                    });
                return;
            }
            var image  = $images[index];
            setImage(image);
            setTimeout(function() {
                var processed = charrambaCore.getCanvasContent();
                processed.toBlob(function (blob) {
                    zipImages.file('glitched-' + index + '.png', blob, {base64: true});
                    processImage(index + 1);
                });
            }, 2000);
        }

        processImage(0);
    }


});