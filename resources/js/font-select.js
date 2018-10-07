$(function() {


    // handle font select
    $('.font-select').on('change', function () {
        var selected = $(this).val();
        if (selected === 'import-font') {
            $('#font-import-modal').modal('show');
            $('#font-import-url').val('').focus();
            $('.font-import__section__message').hide();
        }
        else {
            $(this).css({
                'font-family': selected
            });
        }
    });

    // handle new font add
    $('#font-import-add').on('click', function () {
        var embedCode = $('#font-import-url').val();
        var uploaded = $('#font-import-upload').val();

        if (embedCode !== '') {
            var embedCodeRegex = new RegExp('<link href="https://fonts\\.googleapis\\.com/css\\?family=.+rel="stylesheet">');
            var matchedEmbedCode = embedCode.match(embedCodeRegex);
            console.log(matchedEmbedCode);
            if (matchedEmbedCode !== null && matchedEmbedCode.length > 0) {
                $('head').append(matchedEmbedCode[0]);
                var fontNameRegex = /[A-Z][a-z]+[\+][A-Z][a-z]+|[A-Z][a-z]+/;
                var fontNames = fontNameRegex.exec(embedCode);
                for (var i = 0; i < fontNames.length; i++) {
                    var fontName = fontNames[i].replace('+', ' ');
                    console.log(fontName);
                    addFontToSelect(fontName);
                }
                $('#font-import-modal').modal('hide');

            }
            else {
                $('.font-import__section__message').text("Provided embed code is invalid...").slideDown();
            }
        }
    });

    // add new font to select
    var addFontToSelect = function (fontName) {
        var option = document.createElement('OPTION');
        option.innerText = fontName;
        option.classList.add('select__option');
        option.style = 'font-family: ' + fontName + ';';
        $('.font-select').append(option).val(fontName).css({
            'font-family': fontName
        });
    };

});