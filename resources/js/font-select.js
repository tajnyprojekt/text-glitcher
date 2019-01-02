$(function() {


    // handle font select
    $('.font-select').on('change', function () {
        var selectedValue = $(this).val();
        if (selectedValue === 'import-font') { // open import font dialog
            var previouslySelectedFont = charrambaCore.getParams().text.font;
            $('.font-select').css({
                'font-family': 'Space Mono'
            });
            $('#font-import-modal').modal('show').on('hidden.bs.modal', function () {
                // when hidden without new font select back previous font
                if ($('.font-select').val() === 'import-font') {
                    $('.font-select').val(previouslySelectedFont);
                }
            });
            $('#font-import-url').val('').focus();
            $('.font-import__section__message').hide();
        }
        else { // select font
            $(this).css({
                'font-family': selectedValue
            });
            charrambaCore.setFont(selectedValue);
        }
    });

    // handle new font add
    var fontName;
    $('#font-import-add').on('click', function () {
        var embedCode = $('#font-import-url').val();
        var uploaded = $('#font-import-upload').val();

        if (embedCode !== '') {
            var embedCodeRegex = new RegExp('<link href="https://fonts\\.googleapis\\.com/css\\?family=.+rel="stylesheet">');
            var matchedEmbedCode = embedCode.match(embedCodeRegex);
            if (matchedEmbedCode !== null && matchedEmbedCode.length > 0) {
                $('head').append(matchedEmbedCode[0]);
                var fontNameRegex = /[A-Z][a-z]+[\+][A-Z][a-z]+|[A-Z][a-z]+/;
                var fontNames = fontNameRegex.exec(embedCode);
                for (var i = 0; i < fontNames.length; i++) {
                    fontName = fontNames[i].replace('+', ' ');
                    addFontToSelect(fontName);

                    // wait for font to load
                    document.fonts.onloadingdone = function (fontFaceSetEvent) {
                        charrambaCore.setFont(fontName);
                    };
                }
                $('#font-import-modal').modal('hide');
            }
            else {
                $('.font-import__section__message').text("Warning: provided embed code is invalid.").slideDown();
            }
        }
    });

    // add new font to select
    var addFontToSelect = function (fontName) {
        var option = document.createElement('OPTION');
        option.innerText = fontName;
        option.classList.add('select__option');
        option.style = 'font-family: ' + fontName + ';';
        option.value = fontName;
        $('.font-select').append(option).val(fontName).css({
            'font-family': fontName
        });
    };

});