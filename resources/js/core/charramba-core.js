var charrambaCore;

$(function() {

    // define sketch object
    var createCharrambaCore = function() {

        var params = {
            canvas: {
                width: 640,
                height: 360,
                color: {
                    r: 255,
                    g: 255,
                    b: 255,
                    a: 0,
                    hex: 0xff0000
                }
            },
            text: {
                text: '',
                placeholder: 'Start typing your tex ',
                font: 'Space Mono',
                style: 'normal',
                weight: 'normal',
                align: 'center',
                color: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1,
                    hex: '#000000'
                },
                size: 80,
                lineHeight: 80
            },
            form: {
                scraped: {
                    enabled: false,
                    offset: 0,
                    slices: 10,
                    direction: 0
                },
                liquid: {
                    enabled: false,
                    dissolveX: 1,
                    dissolveY: 1,
                    shift: 0
                },
                pixel: {
                    enabled: false,
                    size: 1
                },
                blur: {
                    enabled: false,
                    amount: 0.07,
                    x: 0,
                    y: 0
                },
                wave: {
                    enabled: false,
                    size: 70
                }
            },
            glitch: {
                lowpass: {
                    treshold: 0.1
                }
            },
            video: {
                playing: false,
                state: 'pause',
                duration: 6000,
                automations: []
            }
        };

        var stateHistory = {
            history: [],
            currentPosition: -1,
            lastChanged: ''
        };



        var redraw = true;

        var app;
        var bgGraphics;
        var textObject;
        var placeholderInterval = false;

        var enabledFilters;
        var glitchFilter;
        var displacementFilter;
        var displacementSprite;
        var asciiFilter;

        var videoTime = 0;

        this.init = function () {
            this.saveState();
            createApp();
            createDisplacementSprite();
            createBgGraphics();
            createText();
            app.start();
            app.ticker.add(function () {
                updateApp();
            });
        };

        var createApp = function () {
            app = new PIXI.Application({
                width: params.canvas.width,
                height: params.canvas.height,
                transparent: true,
                backgroundColor: '#ffffff',
                resolution: 1,
                antialias: true,
                autoStart: false
            });
            var canvasContainer = document.getElementById('canvas-container');
            canvasContainer.appendChild(app.view);
        };

        var createDisplacementSprite = function () {
            displacementSprite = PIXI.Sprite.fromImage('./resources/img/displacement-sprite.png');
            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            displacementSprite.visible = false;
            app.stage.addChild(displacementSprite);
        };

        var createBgGraphics = function () {
            bgGraphics = new PIXI.Graphics();
            bgGraphics.alpha = 1;
            bgGraphics.beginFill(params.canvas.color.hex);
            bgGraphics.drawRect(0, 0, params.canvas.width, params.canvas.height);
            app.stage.addChild(bgGraphics);
        };

        var createText = function () {
            textObject = new PIXI.Text(params.text.text);
            textObject.anchor.x = 0.5;
            textObject.anchor.y = 0.5;
            app.stage.addChild(textObject);
        };

        var updateApp = function () {
            // console.log('update');
            animateParams();
            updateBgGraphics();
            updateText();
            updateFilters();

            if (params.video.state === 'pause') {
                app.stop();
            }
        };

        var updateBgGraphics = function () {
            bgGraphics.clear();
            bgGraphics.alpha = params.canvas.color.a;
            bgGraphics.beginFill(params.canvas.color.hex);
            bgGraphics.drawRect(0, 0, params.canvas.width, params.canvas.height);
        };

        var updateText = function () {
            if (params.text.text !== '') {
                updateTextContent();
                if (placeholderInterval !== false) {
                    clearInterval(placeholderInterval);
                    placeholderInterval = false;
                }
            }
            else {
                if (!placeholderInterval) {
                    placeholderInterval = setInterval(function () {
                        var cursor = '_';
                        if (params.text.placeholder.endsWith(cursor)) {
                            params.text.placeholder = params.text.placeholder.replace(cursor, ' ');
                        }
                        else {
                            params.text.placeholder = params.text.placeholder.slice(0, -cursor.length) + cursor;
                        }
                        app.start();
                    }, 600);
                }
                updateTextPlaceholder();
            }
        };

        var updateTextContent = function () {
            textObject.text = params.text.text;
            textObject.x = app.renderer.view.width / 2;
            textObject.y = app.renderer.view.height / 2;
            textObject.style = {
                wordWrap: true,
                breakWords: true,
                wordWrapWidth: app.renderer.view.width,
                fontFamily: params.text.font,
                fontWeight: params.text.weight,
                fontStyle: params.text.style,
                fontSize: params.text.size,
                lineHeight: params.text.lineHeight,
                align: params.text.align,
                fill: params.text.color.hex
            }
        };

        var updateTextPlaceholder = function () {
            textObject.text = params.text.placeholder;
            textObject.x = app.renderer.view.width / 2;
            textObject.y = app.renderer.view.height / 2;
            textObject.style = {
                wordWrap: true,
                breakWords: true,
                wordWrapWidth: app.renderer.view.width,
                fontFamily: params.text.font,
                fontWeight: params.text.weight,
                fontStyle: params.text.style,
                fontSize: 75,
                lineHeight: 100,
                align: 'center',
                fill: '#aaa'
            }
        };

        var updateFilters = function () {
            enabledFilters = [];
            updateDisplacementFilter();
            updateWaveFilter();
            updateBlurFilter();
            updatePixelFilter();
            updateGlitchFilter();
            app.stage.filters = enabledFilters;
        };

        var updateGlitchFilter = function () {
            if (params.form.scraped.enabled) {
                glitchFilter = new PIXI.filters.GlitchFilter({
                    offset: params.form.scraped.offset,
                    slices: params.form.scraped.slices,
                    direction: params.form.scraped.direction,
                    fillMode: 3, // clamp
                    seed: 0
                });
                enabledFilters.push(glitchFilter);
            }
        };

        var updateDisplacementFilter = function () {
            if (params.form.liquid.enabled) {
                displacementSprite.visible = true;
                displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
                displacementFilter.scale.x = params.form.liquid.dissolveX;
                displacementFilter.scale.y = params.form.liquid.dissolveY;
                displacementSprite.x = params.form.liquid.shift;
                enabledFilters.push(displacementFilter);
            }
            else {
                displacementSprite.visible = false;
            }
        };

        var updatePixelFilter = function() {
            if (params.form.pixel.enabled) {
                var pixelFilter = new PIXI.filters.PixelateFilter();
                pixelFilter.size = params.form.pixel.size;
                enabledFilters.push(pixelFilter);
            }
        };

        var updateBlurFilter = function() {
            if (params.form.blur.enabled) {
                var blurFilter = new PIXI.filters.ZoomBlurFilter();
                blurFilter.strength = params.form.blur.amount;
                blurFilter.center = [
                    params.form.blur.x,
                    params.form.blur.y
                ];
                enabledFilters.push(blurFilter);
            }
        };

        var updateWaveFilter = function() {
            if (params.form.wave.enabled) {
                var waveFilter = new PIXI.filters.ReflectionFilter({
                    boundary: 0,
                    mirror: false,
                    waveLength: [10, params.form.wave.size * 3]
                });
                enabledFilters.push(waveFilter);
            }
        };

        // video

        var animateParams = function () {
            if (params.video.state !== 'pause') {
                videoTime += app.ticker.elapsedMS;
                if (videoTime > params.video.duration) {
                    if (params.video.state === 'loop') {
                        videoTime = 0;
                    }
                    if (params.video.state === 'play') {
                        charrambaCore.setVideoStatePause();
                    }
                }
                videoEditor.updateAnimation(videoTime);
            }
        };

        this.exportVideo = function (filename, callback) {
            var chunks = [];
            var canvas = app.view;
            var stream = canvas.captureStream();
            var recorder = new MediaRecorder(stream);
            recorder.ondataavailable = function (e) {
                chunks.push(e.data);
            };
            recorder.onstop = function (e) {
                var blob = new Blob(chunks, {type: 'video/webm'});
                downloadVideo(blob, filename);
                callback();
            };
            this.setVideoStatePlay();
            videoTime = 0;
            recorder.start();
            setTimeout(function () {
                recorder.stop();
                charrambaCore.setVideoStatePause();
            }, charrambaCore.getParams().video.duration);
        };

        var downloadVideo = function (blob, filename) {
            var vid = document.createElement('video');
            vid.src = URL.createObjectURL(blob);
            vid.controls = true;
            // document.body.appendChild(vid);
            var a = document.createElement('a');
            a.download = filename + '.webm';
            a.href = vid.src;
            // a.textContent = 'download the video';
            // document.body.appendChild(a);
            a.click();
            a.remove();
        };


        // download

        this.downloadImage = function (name, extension) {
            var filename = name + '.' + extension;
            // var dataURL = app.renderer.view.toDataURL('image/' + extension);
            // var link = document.createElement('a');
            // link.download = filename;
            // link.href = dataURL;
            // link.click();

            app.renderer.extract.canvas(app.stage).toBlob(function(b){
                var a = document.createElement('a');
                document.body.append(a);
                a.download = filename;
                a.href = URL.createObjectURL(b);
                a.click();
                a.remove();
            }, 'image/' + extension);
        };

        // params

        this.setWidth = function (newWidth) {
            params.canvas.width = newWidth;
            app.renderer.resize(newWidth, params.canvas.height);
            this.paramsChanged();
            this.saveState();
        };

        this.setHeight = function (newHeight) {
            params.canvas.height = newHeight;
            app.renderer.resize(params.canvas.width, newHeight);
            this.paramsChanged();
            this.saveState();
        };

        this.setBackgroundColor = function (hex, a) {
            var hexEncodedString = hex.substring(1, hex.length);
            var color = parseInt(hexEncodedString, 16);
            params.canvas.color.hex = color;
            params.canvas.color.a = a;
            this.paramsChanged();
            this.saveState();
        };

        this.setText = function (text) {
            params.text.text = text;
            this.paramsChanged();
            this.saveState();
        };

        this.setFont = function (font) {
            params.text.font = font;
            this.paramsChanged();
            this.saveState();
        };

        this.setFontStyleItalic = function () {
            params.text.style = 'italic';
            this.paramsChanged();
            this.saveState();
        };

        this.setFontStyleNormal = function () {
            params.text.style = 'normal';
            this.paramsChanged();
            this.saveState();
        };

        this.setFontWeightBold = function () {
            params.text.weight = 'bold';
            this.paramsChanged();
            this.saveState();
        };

        this.setFontWeightNormal = function () {
            params.text.weight = 'normal';
            this.paramsChanged();
            this.saveState();
        };

        this.setTextAlignLeft = function () {
            params.text.align = 'left';
            this.paramsChanged();
            this.saveState();
        };

        this.setTextAlignCenter = function () {
            params.text.align = 'center';
            this.paramsChanged();
            this.saveState();
        };

        this.setTextAlignRight = function () {
            params.text.align = 'right';
            this.paramsChanged();
            this.saveState();
        };

        this.setTextColor = function (color) {
            params.text.color.hex = color;
            this.paramsChanged();
            this.saveState();
        };

        this.setTextSize = function(size) {
            params.text.size = Number(size);
            this.paramsChanged();
        };

        this.setTextLineHeight = function(lineHeight) {
            params.text.lineHeight = Number(lineHeight);
            this.paramsChanged();
        };

        this.setFormScrapedEnabled = function (enabled) {
            params.form.scraped.enabled = enabled;
            this.paramsChanged();
        };

        this.setFormScrapedOffset = function (offset) {
            params.form.scraped.offset = Number(offset);
            this.paramsChanged();
        };

        this.setFormScrapedSlices = function (slices) {
            params.form.scraped.slices = Number(slices);
            this.paramsChanged();
        };

        this.setFormScrapedDirection = function (direction) {
            params.form.scraped.direction = Number(direction);
            this.paramsChanged();
        };

        this.setFormLiquidEnabled = function (enabled) {
            params.form.liquid.enabled = enabled;
            this.paramsChanged();
        };

        this.setFormLiquidDissolveX = function (dissolveX) {
            params.form.liquid.dissolveX = Number(dissolveX);
            this.paramsChanged();
        };

        this.setFormLiquidDissolveY = function (dissolveY) {
            params.form.liquid.dissolveY = Number(dissolveY);
            this.paramsChanged();
        };

        this.setFormLiquidShift = function (shift) {
            params.form.liquid.shift = Number(shift);
            this.paramsChanged();
        };

        this.setFormPixelEnabled = function (enabled) {
            params.form.pixel.enabled = enabled;
            this.paramsChanged();
        };

        this.setFormPixelSize = function (size) {
            params.form.pixel.size = Number(size);
            this.paramsChanged();
        };

        this.setFormBlurEnabled = function (enabled) {
            params.form.blur.enabled = enabled;
            this.paramsChanged();
        };

        this.setFormBlurAmount = function (enabled) {
            params.form.blur.amount = enabled;
            this.paramsChanged();
        };

        this.setFormBlurX = function (enabled) {
            params.form.blur.x = enabled;
            this.paramsChanged();
        };

        this.setFormBlurY = function (enabled) {
            params.form.blur.y = enabled;
            this.paramsChanged();
        };

        this.setFormWaveEnabled = function (enabled) {
            params.form.wave.enabled = enabled;
            this.paramsChanged();
        };

        this.setFormWaveSize = function (size) {
            params.form.wave.size = Number(size);
            this.paramsChanged();
        };

        this.setLowpassTreshold = function (treshold) {
            params.glitch.lowpass.treshold = treshold;
            this.paramsChanged();
        };

        this.setVideoPlaying = function (playing) {
          params.video.playing = playing;
          // if (!playing) {
          //     this.syncParams();
          // }
          // else {
              this.paramsChanged();
          // }
        };

        this.setVideoTime = function (time) {
            videoTime = time;
        };

        this.setVideoDuration = function (duration) {
            params.video.duration = duration;
            this.paramsChanged();
        };

        this.setVideoStateLoop = function () {
            params.video.state = 'loop';
            this.paramsChanged();
            videoEditor.setAnimatedEffectsEnabled(true);
        };

        this.setVideoStatePlay = function () {
            params.video.state = 'play';
            this.paramsChanged();
            videoEditor.setAnimatedEffectsEnabled(true);
        };


        this.setVideoStatePause = function () {
            this.syncParams();
            params.video.state = 'pause';
            // this.paramsChanged();
            // updateControls();
        };

        this.addVideoAutomation = function (automation) {
            params.video.automations.push(automation);
            this.paramsChanged();
        };

        this.removeVideoAutomation = function (propIndex) {
            for (var i = 0; i < params.video.automations.length; i++) {
                if (params.video.automations[i].propIndex === propIndex) {
                    params.video.automations.splice(i, 1);
                }
            }
            this.paramsChanged();
        };


        this.getParams = function () {
            return params;
        };

        this.getCanvasSelector = function () {
            console.log('get id',canvas);
            return '#' + canvas.canvas.id;//canvas.canvas.id;
        };

        this.paramsChanged = function () {
            redraw = true;
            app.start();
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
                        a: paramsObject.canvas.color.a,
                        hex: paramsObject.canvas.color.hex
                    }
                },
                text: {
                    text: paramsObject.text.text,
                    placeholder: paramsObject.text.placeholder,
                    font: paramsObject.text.font,
                    style: paramsObject.text.style,
                    weight: paramsObject.text.weight,
                    align: paramsObject.text.align,
                    color: {
                        r: paramsObject.text.color.r,
                        g: paramsObject.text.color.g,
                        b: paramsObject.text.color.b,
                        a: paramsObject.text.color.a,
                        hex: paramsObject.text.color.hex
                    },
                    size: paramsObject.text.size,
                    lineHeight: paramsObject.text.lineHeight
                },
                form: {
                    scraped: {
                        enabled: paramsObject.form.scraped.enabled,
                        offset: paramsObject.form.scraped.offset,
                        slices: paramsObject.form.scraped.slices,
                        direction: paramsObject.form.scraped.direction
                    },
                    liquid: {
                        enabled: paramsObject.form.liquid.enabled,
                        dissolveX: paramsObject.form.liquid.dissolveX,
                        dissolveY: paramsObject.form.liquid.dissolveY,
                        shift: paramsObject.form.liquid.shift
                    },
                    pixel: {
                        enabled: paramsObject.form.pixel.enabled,
                        size: paramsObject.form.pixel.size
                    },
                    blur: {
                        enabled: paramsObject.form.blur.enabled,
                        amount: paramsObject.form.blur.amount,
                        x: paramsObject.form.blur.x,
                        y: paramsObject.form.blur.y
                    },
                    wave: {
                        enabled: paramsObject.form.wave.enabled,
                        size: paramsObject.form.wave.size
                    }
                },
                glitch: {
                    lowpass: {
                        treshold: paramsObject.glitch.lowpass.treshold
                    }
                },
                video: {
                    playing: paramsObject.video.playing,
                    state: paramsObject.video.state,
                    duration: paramsObject.video.duration,
                    automations:  paramsObject.video.automations.slice()
                }
            };
        };

        this.saveState = function () {
            stateHistory.history.push(cloneParams(params));
            stateHistory.currentPosition++;
        };

        this.syncParams = function () {
            params = cloneParams(stateHistory.history[stateHistory.currentPosition]);
            this.paramsChanged();
            // updateControls();
        };

        this.undo = function () {
            if (stateHistory.currentPosition > 0) {
                stateHistory.currentPosition = stateHistory.currentPosition - 1;
                params = cloneParams(stateHistory.history[stateHistory.currentPosition]);
                this.paramsChanged();
                updateControls();
            }
        };

        this.redo = function () {
            if (stateHistory.currentPosition < stateHistory.history.length - 1) {
                stateHistory.currentPosition++;
                params = cloneParams(stateHistory.history[stateHistory.currentPosition]);
                this.paramsChanged();
                updateControls();
            }
        };

        var updateControls = function () {
            controlPanel.setControlValue(CONTROLS.canvas.width, params.canvas.width, false);
            controlPanel.setControlValue(CONTROLS.canvas.width, params.canvas.width, false);
            // TODO: bg color
            controlPanel.setControlValue(CONTROLS.text.input, params.text.text, false);
            controlPanel.setControlValue(CONTROLS.text.font, params.text.font, false);
            // TODO: text style
            // TODO: text color
            controlPanel.setControlValue(CONTROLS.text.size, params.text.size, false);
            controlPanel.setControlValue(CONTROLS.text.lineHeight, params.text.lineHeight, false);
            controlPanel.setControlChecked(CONTROLS.form.scraped.enabled, params.form.scraped.enabled, false);
            controlPanel.setControlValue(CONTROLS.form.scraped.offset, params.form.scraped.offset, false);
            controlPanel.setControlValue(CONTROLS.form.scraped.slices, params.form.scraped.slices, false);
            controlPanel.setControlValue(CONTROLS.form.scraped.direction, params.form.scraped.direction, false);
            controlPanel.setControlChecked(CONTROLS.form.liquid.enabled, params.form.liquid.enabled, false);
            controlPanel.setControlValue(CONTROLS.form.liquid.dissolveX, params.form.liquid.dissolveX, false);
            controlPanel.setControlValue(CONTROLS.form.liquid.dissolveY, params.form.liquid.dissolveY, false);
            controlPanel.setControlValue(CONTROLS.form.liquid.shift, params.form.liquid.shift, false);
            controlPanel.setControlChecked(CONTROLS.form.pixel.enabled, params.form.pixel.enabled, false);
            controlPanel.setControlValue(CONTROLS.form.pixel.size, params.form.pixel.size, false);
            controlPanel.setControlChecked(CONTROLS.form.blur.enabled, params.form.blur.enabled, false);
            controlPanel.setControlValue(CONTROLS.form.blur.amount, params.form.blur.amount, false);
            controlPanel.setControlValue(CONTROLS.form.blur.x, params.form.blur.x, false);
            controlPanel.setControlValue(CONTROLS.form.blur.y, params.form.blur.y, false);

            controlPanel.getControl(CONTROLS.video.loop).removeClass('selected');
            controlPanel.getControl(CONTROLS.video.play).removeClass('selected');

            if (params.video.state === 'loop') {
                controlPanel.getControl(CONTROLS.video.loop).addClass('selected');
            }
            if (params.video.state === 'play') {
                controlPanel.getControl(CONTROLS.video.play).addClass('selected');
            }

        };

        return this;
    };

    charrambaCore = createCharrambaCore();
    charrambaCore.init();

});