$(function() {

    // enable tooltips
    // $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });

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

    // collapse control group
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


    // init background color picker https://github.com/Simonwep/pickr
    var backgroundColorPickr = new Pickr({
        el: '.background-color-picker',

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
            $('.background-color-picker').css({
                'background-color': hexColor,
                'color': adjustFontColor(hexColor)
            });
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