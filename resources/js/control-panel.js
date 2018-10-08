var controlPanel;
var CONTROLS;

$(function() {

    CONTROLS = {
        canvas: {
            size: {
                width: 'size-width',
                height: 'size-height'
            },
            background: {
                color: 'background-color'
            },
            zoom: {
                amount: 'zoom-amount',
                reset: 'zoom-reset'
            }
        },
        text: {

        },
        shift: {

        },
        glitch: {

        },
        download: {

        }
    };

    controlPanel = {

        getControl: function (dataFunction) {
            return $('.js-control[data-function="' + dataFunction + '"]');
        },

        getControlValue: function (dataFunction) {
            return this.getControl(dataFunction).val();
        },

        setControlValue: function (dataFunction, value) {
            this.getControl(dataFunction).val(value);
        }

    };

    // show selected tool menu
    $('.js-tool-button').on('click', function () {
        var tool = $(this).data('tool');
        var menuItem = $('.js-tool-menu[data-tool="' + tool + '"]');
        var wasOpened = menuItem.hasClass('opened');
        $('.js-tool-menu').removeClass('opened');
        $('.js-tool-button').removeClass('opened');

        $('.tool-menu__item__control-group').removeClass('hidden').removeClass('opened');
        $('.tool-menu__item__control-group__content').removeClass('hidden').removeClass('opened');

        // if (!wasOpened) {
        menuItem.addClass('opened');
        $(this).addClass('opened');
        // }

    });

    // collapse control group on mobile
    $('.tool-menu__item__control-group__name').on('click', function () {
        var group = $(this).parent();
        var content = $(this).next();
        var wasOpened = group.hasClass('opened');
        if ( $(window).width() < 768) {
            $('.tool-menu__item__control-group').addClass('hidden').removeClass('opened');
            $('.tool-menu__item__control-group__content').removeClass('opened');

            if (!wasOpened) {
                group.removeClass('hidden').addClass('opened');
                content.addClass('opened');
            }
            else {
                $('.tool-menu__item__control-group').removeClass('hidden');
            }
        }
    });

    // hide captions
    $('.tool-menu__item__control__caption').hide();


    // init background color picker https://github.com/Simonwep/pickr
    var backgroundColorPickr = new Pickr({
        el: '.background-color-picker',

        default: '#00000000',
        useAsButton: true,
        appendToBody: true,
        closeWithKey: 'Escape',
        position: 'middle',

        strings: {
            save: 'SELECT',  // Default for save button
            clear: 'CANCEL' // Default for clear button
        },

        components: {

            preview: true,
            opacity: true,
            hue: true,

            interaction: {
                rgba: true,
                hex: true,
                hsva: false,
                input: true,
                clear: true,
                save: true
            }
        },

        onSave(hsva, instance) {
            var hexArray = hsva.toHEX();
            var rgbaArray = hsva.toRGBA();
            var hexColor = '#' + hexArray[0] + hexArray[1] + hexArray[2];
            if (hsva.a < 0.3) {
                $('.background-color-picker').css({
                    'background': 'url("./resources/img/checkboard-small.png") repeat',
                    'color': '#000'
                });
            }
            else {
                $('.background-color-picker').css({
                    'background': hexColor,
                    'color': adjustFontColor(hexColor)
                });
            }
            charrambaCore.setBackgroundColor(rgbaArray[0], rgbaArray[1], rgbaArray[2], hsva.a);
        }
    });

    var textColorPickr = new Pickr({
        el: '.text-color-picker',

        default: '#000000',
        useAsButton: true,
        appendToBody: true,
        closeWithKey: 'Escape',
        position: 'middle',

        strings: {
            save: 'SELECT',  // Default for save button
            clear: 'CANCEL' // Default for clear button
        },

        components: {

            preview: true,
            opacity: false,
            hue: true,

            interaction: {
                hex: true,
                rgba: true,
                hsva: false,
                input: true,
                clear: true,
                save: true
            }
        },

        onSave(hsva, instance) {
            var hexArray = hsva.toHEX();
            var hexColor = '#' + hexArray[0] + hexArray[1] + hexArray[2];
            $('.text-color-picker').css({
                'background-color': hexColor,
                'color': adjustFontColor(hexColor)
            });
        }
    });

    function adjustFontColor(hexTripletColor) {
        var color = hexTripletColor;
        color = color.substring(1); // remove #
        color = parseInt(color, 16);
        color = color > 0x888888 ? 0 : 0xffffff;
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color;
        return color;
    }

});