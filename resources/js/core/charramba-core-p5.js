var charrambaCore;

$(function() {

    // define sketch object
    var sketch = function(p) {

        var params = {
            canvas: {
                width: 640,
                height: 360,
                color: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 0
                }
            },
            text: {
                text: '',
                font: 'Space Mono',
                style: p.NORMAL,
                align: p.CENTER,
                color: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 255
                },
                size: 40,
                lineHeight: 40
            },
            shift: {
                horizontal: {
                    shift: 0,
                    size: 60
                },
                vertical: {
                    shift: 0,
                    size: 60
                },
                chromatic: {
                    shift: 0
                }
            },
            glitch: {
                lowpass: {
                    treshold: 0.1
                }
            }
        };

        var stateHistory = {
            history: [],
            currentPosition: 0,
            lastChanged: ''
        };

        var canvas;
        var graphics;
        var helperGraphics;

        var redraw = true;
        var canRedraw = true;

        p.setup = function () {
            canvas = p.createCanvas(params.canvas.width, params.canvas.height);
            p.clear();
            createNewGraphics();

        };

        var createNewGraphics = function () {
            graphics = p.createGraphics(params.canvas.width, params.canvas.height);
            helperGraphics = p.createGraphics(params.canvas.width, params.canvas.height);
            graphics.pixelDensity(1);
            helperGraphics.pixelDensity(1);
        };

        p.draw = function () {
            if (canRedraw && redraw) {
                p.clear();
                p.background(
                    params.canvas.color.r,
                    params.canvas.color.g,
                    params.canvas.color.b,
                    params.canvas.color.a
                );
                drawOnGraphics();
                p.image(graphics, 0, 0, p.width, p.height);

                redraw = false;
                canRedraw = false;

                setTimeout(function() {
                    canRedraw = true;
                }, 10);
            }
        };

        // graphics

        var drawOnGraphics = function () {
            graphics.clear();
            helperGraphics.clear();
            drawText();
            applyEffects();
        };

        // text

        var drawText = function () {
            styleText();
            var textBox = graphics.textWidth(getLongestVerse(params.text.text));
            var x;
            var y = graphics.height / 2;
            if (params.text.align === p.LEFT) {
                x = graphics.width / 2 - textBox / 2;
            }
            if (params.text.align === p.CENTER) {
                x = graphics.width / 2;
            }
            if (params.text.align === p.RIGHT) {
                x = graphics.width / 2 + textBox / 2;
            }
            graphics.text(params.text.text, x, y);
        };

        var getLongestVerse = function (text) {
            var verses = text.split('\n');
            var index = 0;
            for (var i = 1; i < verses.length; i++) {
                if (verses[index].length < verses[i].length) {
                    index = i;
                }
            }
            return verses[index];
        };

        var styleText = function () {
            graphics.stroke(
                params.text.color.r,
                params.text.color.g,
                params.text.color.b,
                params.text.color.a
            );
            graphics.fill(
                params.text.color.r,
                params.text.color.g,
                params.text.color.b,
                params.text.color.a
            );
            graphics.textSize(params.text.size);
            graphics.textFont(params.text.font);
            graphics.textAlign(params.text.align, p.CENTER);
            graphics.textLeading(params.text.lineHeight);
            graphics.textStyle(params.text.style);
        };

        var applyEffects = function () {
            graphics.loadPixels();
            helperGraphics.loadPixels();
            applyRowShiftPixels();
            helperGraphics.updatePixels();
            graphics.clear();
            applyColumnShiftPixels();
            graphics.updatePixels();
            //
            // graphics.loadPixels();
            // applyLowpassEffect();
            // graphics.updatePixels();


            applyRGBShift();
        };

        // shift effects

        var applyRowShiftPixels = function () {
            var rowY, iteration = 0;
            for (rowY = 0; rowY < graphics.height - params.shift.horizontal.size; rowY += params.shift.horizontal.size) {
                if (iteration % 2 === 1) {
                    copyPixels(graphics, helperGraphics, 0, rowY, graphics.width, params.shift.horizontal.size, params.shift.horizontal.shift, rowY);
                }
                else {
                    copyPixels(graphics, helperGraphics, 0, rowY, graphics.width, params.shift.horizontal.size, 0, rowY);
                }
                iteration++;
            }
            copyPixels(graphics, helperGraphics, 0, rowY, graphics.width, graphics.height - rowY, 0, rowY);
        };

        var applyColumnShiftPixels = function () {
            var colX, iteration = 0;
            for (colX = 0; colX < graphics.width - params.shift.vertical.size; colX += params.shift.vertical.size) {
                if (iteration % 2 === 1) {
                    copyPixels(helperGraphics, graphics, colX, 0, params.shift.vertical.size, graphics.height, colX, params.shift.vertical.shift);
                }
                else {
                    copyPixels(helperGraphics, graphics, colX, 0, params.shift.vertical.size, graphics.height, colX, 0);
                }
                iteratioJoin Eezy!  Login
                Free Vector Art at Vecteezy
                Vecteezy Editor
                Try our new FREE SVG editor! Designed to allow anyone to customize Vecteezy content before they download it, or create beautiful vector designs from scratch directly in your browser.

                    Start Designing
                Icon-friendly
                Friendly Interface
                Easy for beginners. Powerful for Professionals. Built with everyone in mind for the modern web.

                    Icon-feature-rich
                Feature Rich
                Loaded with the features you need including keyboard shortcuts, advanced transformations and more.

                    Icon-fully-integrated
                Fully Integrated
                Built directly into our website for a streamlined workflow. No need to download an app or install anything.

                    How Does It Work?
                    Watch the video below for a full introduction.


                00:00 | 04:30
                Try the Vecteezy Editor
                Curve
                Icon-help
                Need Some Help?
                    Go to Help Center
                Our Network
                Brusheezy
                Vecteezy
                Videezy
                Themezy
                About Us
                About Us
                Our Team
                Our Blog
                Contact Us
                Site Links
                Deals
                Advertise
                Support
                DMCAJoin Eezy!  Login
                Free Vector Art at Vecteezy
                Vecteezy Editor
                Try our new FREE SVG editor! Designed to allow anyone to customize Vecteezy content before they download it, or create beautiful vector designs from scratch directly in your browser.

                    Start Designing
                Icon-friendly
                Friendly Interface
                Easy for beginners. Powerful for Professionals. Built with everyone in mind for the modern web.

                    Icon-feature-rich
                Feature Rich
                Loaded with the features you need including keyboard shortcuts, advanced transformations and more.

                    Icon-fully-integrated
                Fully Integrated
                Built directly into our website for a streamlined workflow. No need to download an app or install anything.

                    How Does It Work?
                    Watch the video below for a full introduction.


                00:00 | 04:30
                Try the Vecteezy Editor
                Curve
                Icon-help
                Need Some Help?
                    Go to Help Center
                Our Network
                Brusheezy
                Vecteezy
                Videezy
                Themezy
                About Us
                About Us
                Our Team
                Our Blog
                Contact Us
                Site Links
                Deals
                Advertise
                Support
                DMCAJoin Eezy!  Login
                Free Vector Art at Vecteezy
                Vecteezy Editor
                Try our new FREE SVG editor! Designed to allow anyone to customize Vecteezy content before they download it, or create beautiful vector designs from scratch directly in your browser.

                    Start Designing
                Icon-friendly
                Friendly Interface
                Easy for beginners. Powerful for Professionals. Built with everyone in mind for the modern web.

                    Icon-feature-rich
                Feature Rich
                Loaded with the features you need including keyboard shortcuts, advanced transformations and more.

                    Icon-fully-integrated
                Fully Integrated
                Built directly into our website for a streamlined workflow. No need to download an app or install anything.

                    How Does It Work?
                    Watch the video below for a full introduction.


                00:00 | 04:30
                Try the Vecteezy Editor
                Curve
                Icon-help
                Need Some Help?
                    Go to Help Center
                Our Network
                Brusheezy
                Vecteezy
                Videezy
                Themezy
                About Us
                About Us
                Our Team
                Our Blog
                Contact Us
                Site Links
                Deals
                AdvertiseJoin Eezy!  Login
                Free Vector Art at Vecteezy
                Vecteezy Editor
                Try our new FREE SVG editor! Designed to allow anyone to customize Vecteezy content before they download it, or create beautiful vector designs from scratch directly in your browser.

                    Start Designing
                Icon-friendly
                Friendly Interface
                Easy for beginners. Powerful for Professionals. Built with everyone in mind for the modern web.

                    Icon-feature-rich
                Feature Rich
                Loaded with the features you need including keyboard shortcuts, advanced transformations and more.

                    Icon-fully-integrated
                Fully Integrated
                Built directly into our website for a streamlined workflow. No need to download an app or install anything.

                    How Does It Work?
                    Watch the video below for a full introduction.


                00:00 | 04:30
                Try the Vecteezy Editor
                Curve
                Icon-help
                Need Some Help?
                    Go to Help Center
                Our Network
                Brusheezy
                Vecteezy
                Videezy
                Themezy
                About Us
                About Us
                Our Team
                Our Blog
                Contact Us
                Site LinksJoin Eezy!  Login
                Free Vector Art at Vecteezy
                Vecteezy Editor
                Try our new FREE SVG editor! Designed to allow anyone to customize Vecteezy content before they download it, or create beautiful vector designs from scratch directly in your browser.

                    Start Designing
                Icon-friendly
                Friendly Interface
                Easy for beginners. Powerful for Professionals. Built with everyone in mind for the modern web.

                    Icon-feature-rich
                Feature Rich
                Loaded with the features you need including keyboard shortcuts, advanced transformations and more.

                    Icon-fully-integrated
                Fully Integrated
                Built directly into our website for a streamlined workflow. No need to download an app or install anything.

                    How Does It Work?
                    Watch the video below for a full introduction.


                00:00 | 04:30
                Try the Vecteezy Editor
                Curve
                Icon-help
                Need Some Help?
                    Go to Help Center
                Our Network
                Brusheezy
                Vecteezy
                Videezy
                Themezy
                About Us
                About Us
                Our Team
                Our Blog
                Contact Us
                Site Links
                Deals
                Advertise
                Support
                DMCA
                Languages
                English
                Español
                Português
                More...
                    Eezy-logo
© 2018 Eezy Inc. All rights reserved • Terms of Use Privacy Policy



                Deals
                Advertise
                Support
                DMCA
                Languages
                English
                Español
                Português
                More...
                    Eezy-logo
© 2018 Eezy Inc. All rights reserved • Terms of Use Privacy Policy



                Support
                DMCA
                Languages
                English
                Español
                Português
                More...
                    Eezy-logo
© 2018 Eezy Inc. All rights reserved • Terms of Use Privacy Policy
                980
                980
                100
                100
                0



                Languages
                English
                Español
                Português
                More...
                    Eezy-logo
© 2018 Eezy Inc. All rights reserved • Terms of Use Privacy Policy
                0
                0
                100
                100
                4



                Languages
                English
                Español
                Português
                More...
                    Eezy-logo
© 2018 Eezy Inc. All rights reserved • Terms of Use Privacy Policy
                0
                0
                100
                100
                10


                n++;
            }
            copyPixels(helperGraphics, graphics, colX, 0, helperGraphics.width - colX, graphics.height, colX, 0);
        };

        var applyRGBShift = function () {
            var shift = params.shift.chromatic.shift;
            helperGraphics.clear();

            graphics.filter(p.INVERT);
            helperGraphics.tint(255, 0, 0, 128);
            helperGraphics.image(graphics, -3 * shift, -3 * shift);

            helperGraphics.tint(0, 255, 0, 128);
            helperGraphics.image(graphics, 3 * shift, 3 * shift);

            helperGraphics.tint(0, 0, 255, 128);
            helperGraphics.image(graphics, -4 * shift, 3 * shift);


            helperGraphics.noTint();
            graphics.filter(p.INVERT);

            helperGraphics.image(graphics, 0, 0);
            graphics.clear();
            graphics.image(helperGraphics, 0, 0);
        };


        var copyPixels = function (source, dest, sx, sy, sw, sh, dx, dy) {
            for (var x = 0; x < sw; x++) {
                for (var y = 0; y < sh; y++) {
                    var sourceIndex = 4 * (x + sx + (y + sy) * source.width);
                    var destIndex = 4 * (x + dx + (y + dy) * dest.width);
                    if (destIndex > dest.pixels.length) {
                        destIndex = dest.pixels.length - 1;
                    }
                    dest.pixels[destIndex] = source.pixels[sourceIndex];
                    dest.pixels[destIndex + 1] = source.pixels[sourceIndex + 1];
                    dest.pixels[destIndex + 2] = source.pixels[sourceIndex + 2];
                    dest.pixels[destIndex + 3] = source.pixels[sourceIndex + 3];
                }
            }
        };

        // glitch effects

        var applyLowpassEffect = function () {
            var pixelColor = rgbaToColor(graphics.pixels[0], graphics.pixels[1], graphics.pixels[2], graphics.pixels[3]);
            console.log(pixelColor);
            pixelColor = Math.round(params.glitch.treshold * pixelColor);
            var pixel = colorToRgba(pixelColor);
            graphics.pixels[0] = pixel.r;
            graphics.pixels[1] = pixel.g;
            graphics.pixels[2] = pixel.b;
            graphics.pixels[3] = pixel.a;
            var previousPixelColor;
            for (var i = 4; i < graphics.pixels.length - 4; i += 4) {
                previousPixelColor = rgbaToColor(graphics.pixels[i - 4], graphics.pixels[i - 4 + 1], graphics.pixels[i - 4 + 2], graphics.pixels[i - 4 + 3]);
                pixelColor = rgbaToColor(graphics.pixels[i], graphics.pixels[i + 1], graphics.pixels[i + 2], graphics.pixels[i + 3]);
                pixelColor = Math.round(previousPixelColor + params.glitch.treshold * (pixelColor - previousPixelColor));
                pixel = colorToRgba(pixelColor);
                graphics.pixels[i] = pixel.r;
                graphics.pixels[i + 1] = pixel.g;
                graphics.pixels[i + 2] = pixel.b;
                graphics.pixels[i + 3] = 100;
            }
        };

        var rgbaToColor = function (r, g, b, a) {
            return r * 16777216 + g * 65536 + b * 256 + a;
        };

        var colorToRgba = function (color) {
            return {
                r: (color / 16777216).toFixed(),
                g: ((color % 16777216) / 65536).toFixed(),
                b: ((color % 65536) / 256).toFixed(),
                a: (color % 256).toFixed()
            }
        };

        // download

        p.downloadImage = function (name, extension) {
            var filename = name + '.' + extension;
            p.save(filename);
        };

        // params

        p.setWidth = function (newWidth) {
            params.canvas.width = newWidth;
            p.resizeCanvas(newWidth, params.canvas.height);
            createNewGraphics();
            p.paramsChanged();
            p.saveState();
        };

        p.setHeight = function (newHeight) {
            params.canvas.height = newHeight;
            p.resizeCanvas(params.canvas.width, newHeight);
            createNewGraphics();
            p.paramsChanged();
            p.saveState();
        };

        p.setBackgroundColor = function (r, g, b, a) {
            params.canvas.color.r = r;
            params.canvas.color.g = g;
            params.canvas.color.b = b;
            params.canvas.color.a = a;
            p.paramsChanged();
            p.saveState();
        };

        p.setText = function (text) {
            params.text.text = text;
            p.paramsChanged();
            p.saveState();
        };

        p.setFont = function (font) {
            params.text.font = font;
            p.paramsChanged();
            p.saveState();
        };

        p.setFontStyleNormal = function () {
            params.text.style = p.NORMAL;
            p.paramsChanged();
            p.saveState();
        };

        p.setFontStyleBold = function () {
            params.text.style = p.BOLD;
            p.paramsChanged();
            p.saveState();
        };

        p.setFontStyleItalic = function () {
            params.text.style = p.ITALIC;
            p.paramsChanged();
            p.saveState();
        };

        p.setTextAlignLeft = function () {
            params.text.align = p.LEFT;
            p.paramsChanged();
            p.saveState();
        };

        p.setTextAlignCenter = function () {
            params.text.align = p.CENTER;
            p.paramsChanged();
            p.saveState();
        };

        p.setTextAlignRight = function () {
            params.text.align = p.RIGHT;
            p.paramsChanged();
            p.saveState();
        };

        p.setTextColor = function (r, g, b, a) {
            params.text.color.r = r;
            params.text.color.g = g;
            params.text.color.b = b;
            params.text.color.a = a;
            p.paramsChanged();
            p.saveState();
        };

        p.setTextSize = function(size) {
            params.text.size = Number(size);
            p.paramsChanged();
        };

        p.setTextLineHeight = function(lineHeight) {
            params.text.lineHeight = Number(lineHeight);
            p.paramsChanged();
        };

        p.setShiftHorizontalShift = function (horizontalShift) {
            params.shift.horizontal.shift = Number(horizontalShift);
            p.paramsChanged();
        };

        p.setShiftHorizontalSize = function (horizontalSize) {
            params.shift.horizontal.size = Number(horizontalSize);
            p.paramsChanged();
        };

        p.setShiftVerticalShift = function (horizontalShift) {
            params.shift.vertical.shift = Number(horizontalShift);
            p.paramsChanged();
        };

        p.setShiftVerticalSize = function (horizontalSize) {
            params.shift.vertical.size = Number(horizontalSize);
            p.paramsChanged();
        };

        p.setShiftChromaticShift = function (chromaticShift) {
            params.shift.chromatic.shift = Number(chromaticShift);
            p.paramsChanged();
        };

        p.setLowpassTreshold = function (treshold) {
            params.glitch.lowpass.treshold = treshold;
            p.paramsChanged();
        };

        p.getParams = function () {
            return params;
        };

        p.getCanvasSelector = function () {
            console.log('get id',canvas);
            return '#' + canvas.canvas.id;//canvas.canvas.id;
        };

        p.paramsChanged = function () {
            redraw = true;
        };

        // actions history

        var cloneParams = function (paramsObject) {
            return {
                canvas: {
                    width: paramsObject.canvas.width,
                    height: paramsObject.canvas.height,
                    color: {
                        r: paramsObject.canvas.color.r,
                        g: paramsObject.canvas.color.g,
                        b: paramsObject.canvas.color.b,
                        a: paramsObject.canvas.color.a
                    }
                },
                text: {
                    text: paramsObject.text.text,
                    font: paramsObject.text.font,
                    style: paramsObject.text.style,
                    align: paramsObject.text.align,
                    color: {
                        r: paramsObject.text.color.r,
                        g: paramsObject.text.color.g,
                        b: paramsObject.text.color.b,
                        a: paramsObject.text.color.a
                    },
                    size: paramsObject.text.size,
                    lineHeight: paramsObject.text.lineHeight
                },
                shift: {
                    horizontal: {
                        shift: paramsObject.shift.horizontal.shift,
                        size: paramsObject.shift.horizontal.size
                    },
                    vertical: {
                        shift: paramsObject.shift.vertical.shift,
                        size: paramsObject.shift.vertical.size
                    },
                    chromatic: {
                        shift: paramsObject.shift.chromatic.shift
                    }
                },
                glitch: {
                    lowpass: {
                        treshold: paramsObject.glitch.lowpass.treshold
                    }
                }
            };
        };

        p.saveState = function () {
            stateHistory.history.push(cloneParams(params));
            stateHistory.currentPosition++;
            // console.log(stateHistory);
        };

        p.undo = function () {
            if (stateHistory.currentPosition > 0) {
                stateHistory.currentPosition = stateHistory.currentPosition - 1;
                params = cloneParams(stateHistory.history[stateHistory.currentPosition]);
                p.paramsChanged();
            }
        };

        p.redo = function () {
            if (stateHistory.currentPosition < stateHistory.history.length - 1) {
                stateHistory.currentPosition++;
                params = cloneParams(stateHistory.history[stateHistory.currentPosition]);
                p.paramsChanged();
            }
        };


    };

    // init p5 sketch
    var canvasContainer = document.getElementById('canvas-container');
    charrambaCore = new p5(sketch, canvasContainer);

});