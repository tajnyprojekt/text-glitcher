var controlPanel;
var CONTROLS;

$(function() {

    CONTROLS = {
        canvas: {
            size: {
                width: 'size-width',
                height: 'size-height',
                helpers: {
                    widthMinus: 'size-width-minus',
                    widthPlus: 'size-width-plus',
                    heightMinus: 'size-height-minus',
                    heightPlus: 'size-height-plus'
                }
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
            input: 'text-input',
            font: 'font-select',
            style: {
                bold: 'font-style-bold',
                italic: 'font-style-italic'
            },
            align: {
                left: 'text-align-left',
                center: 'text-align-center',
                right: 'text-align-right'
            },
            color: 'text-color',
            size: 'text-size',
            lineHeight: 'text-line-height'
        },
        form: {
            scraped: {
                enabled: 'form-scraped-enabled',
                offset: 'form-scraped-offset',
                slices: 'form-scraped-slices',
                direction: 'form-scraped-direction'
            },
            liquid: {
                enabled: 'form-liquid-enabled',
                dissolveX: 'form-liquid-dissolve-x',
                dissolveY: 'form-liquid-dissolve-y',
                shift: 'form-liquid-shift'
            },
            ascii: {
                enabled: 'form-ascii-enabled',
                size: 'form-ascii-size'
            }
        },
        glitch: {
            lowpass: {
                treshold: 'glitch-lowpass-treshold'
            }
        },
        download: {
            name: 'download-name',
            extension: 'download-extension',
            button: 'download-button'
        }
    };

    controlPanel = {

        getControl: function (dataFunction) {
            return $('.js-control[data-function="' + dataFunction + '"]');
        },

        getControlValue: function (dataFunction) {
            return this.getControl(dataFunction).val();
        },

        setControlValue: function (dataFunction, value, triggerChange) {
            this.getControl(dataFunction).val(value);
            if (typeof(triggerChange) === 'undefined' || triggerChange === true) {
                this.getControl(dataFunction).trigger('change');
            }
        },

        setControlChecked: function (dataFunction, checked, triggerChange) {
            this.getControl(dataFunction).prop('checked', checked);
            if (typeof(triggerChange) === 'undefined' || triggerChange === true) {
                this.getControl(dataFunction).trigger('change');
            }
        },

        getControlValueLabelByControl: function (dataFunction) {
            return this.getControl(dataFunction).parent().find('.tool-menu__item__control__name span');
        },

        getControlValueLabelBySelector: function (selector) {
            return $(selector).parent().find('.tool-menu__item__control__name span');
        }

    };

    // handle slider finished updating

    $('.js-control[type="range"]').on('mousedown', function () {
        $(this).on('mouseup', function () {
            charrambaCore.saveState();
            $(this).off('mouseup');
        })
    });

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

    $('.js-update-label').on('change input', function () {
        var val = $(this).val();
        var $labelSpan = controlPanel.getControlValueLabelBySelector(this);
        $labelSpan.text(val);
    });



    // init background color picker https://github.com/Simonwep/pickr
    var backgroundColorPickr = new Pickr({
        el: '.background-color-picker',

        default: '#ffffff00',
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
            handlePickrOnSaveHexAlpha(hsva, instance, charrambaCore.setBackgroundColor);
            console.log(instance);
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
            handlePickrOnSaveHex(hsva, instance, charrambaCore.setTextColor);
        }
    });

    var handlePickrOnSaveHexAlpha = function (hsva, instance, rgbaColorSetterFunction) {
        var hexArray = hsva.toHEX();
        var rgbaArray = hsva.toRGBA();
        var hexColor = '#' + hexArray[0] + hexArray[1] + hexArray[2];
        if (hsva.a < 0.3) {
            $(instance.options.el).css({
                'background': 'url("./resources/img/checkboard-small.png") repeat',
                'color': '#000'
            });
        }
        else {
            $(instance.options.el).css({
                'background': hexColor,
                'color': adjustFontColor(hexColor)
            });
        }
        rgbaColorSetterFunction(hexColor, hsva.a);
    };

    var handlePickrOnSaveHex = function (hsva, instance, hexColorSetterFunction) {
        var hexArray = hsva.toHEX();
        var hexColor = '#' + hexArray[0] + hexArray[1] + hexArray[2];
        $(instance.options.el).css({
            'background': hexColor,
            'color': adjustFontColor(hexColor)
        });
        hexColorSetterFunction(hexColor);
    };

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


    // hide captions
    $('.tool-menu__item__control__caption').hide();

});