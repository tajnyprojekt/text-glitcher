
var graphics;
var outputGraphics;
var paramsChanged = false;
var isDrawInitialMessage = false;

var params = {
    text: '',
    color: '#000000',
    textSize: 60,
    textFont: 'Arial',
    lineHeight: 30,
    align: 'center',
    style: 'normal',
    row: {
        height: 255,
        shift: 0
    },
    column: {
        width: 255,
        shift: 0
    }
};

// main functions
var canvas;
function setup() {
    var canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer.offsetWidth < 640 || canvasContainer.offsetHeight < 480) {
        canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    }
    else {
        canvas = createCanvas(640, 480);
    }
    canvas.parent('canvas-wrapper');
    graphics = createGraphics(640, 480);
    outputGraphics = createGraphics(640, 480);
    graphics.pixelDensity(1);
    outputGraphics.pixelDensity(1);

    updateSliders();
    drawInitialMessage();
}

function draw() {
    if (paramsChanged) {
        background(255);
        drawOnGraphics();
        drawGraphicsOnScreen();
        paramsChanged = false;

        if (isDrawInitialMessage && params.text === '') {
            drawInitialMessage();
        }
    }
}

function drawGraphicsOnScreen() {
    if (width >= outputGraphics.width && height >= outputGraphics.height) { // sketch larger than graphics
        image(graphics, (width - outputGraphics.width) / 2, (height - outputGraphics.height) / 2);
    }
    else {
        var ratio = outputGraphics.height / outputGraphics.width;
        var scaledHeight = width * ratio;
        var d = pixelDensity();
        image(graphics, 0, (height - scaledHeight) / 2 * d, width, scaledHeight, 0, 0, outputGraphics.width, outputGraphics.height );
    }
}

function drawInitialMessage() {
    stroke('#b3b3b3');
    fill('#b3b3b3');
    if (width < 576) {
        textSize(15);
    }
    else if (width < 768) {
        textSize(60);
    }
    else {
        textSize(60);
    }
    textFont('Courier New');
    textAlign(CENTER, CENTER);
    var message = 'Start typing\nyour text';
    text(message, width / 2, height / 2);
}

function hideInitialMessage() {
    isDrawInitialMessage = false;
    paramsChanged = true;
}

function windowResized() {
    var canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer.offsetWidth < 640 || canvasContainer.offsetHeight < 480) {
        resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    }
    else {
        resizeCanvas(640, 480);
    }
    paramsChanged = true;
}

var semaphore = true;
function download() {
    if (semaphore) {
        semaphore = false;
        background(255);
        clear();
        drawOnGraphics();
        drawGraphicsOnScreen();
        save('myGltchedText.png');
        semaphore = true;
    }
}

// custom functions

function drawOnGraphics() {
    outputGraphics.clear();
    graphics.clear();
    style();
    drawText();
    applyEffects();
}

function style() {
    graphics.stroke(params.color);
    graphics.fill(params.color);
    graphics.textSize(params.textSize);
    graphics.textFont(params.textFont);
    graphics.textAlign(params.align, CENTER);
    graphics.textLeading(params.lineHeight);
    graphics.textStyle(params.style);
}

function getLongestVerse(text) {
    var verses = text.split('\n');
    var index = 0;
    for (i = 1; i < verses.length; i++) {
        if (verses[index].length < verses[i].length) {
            index = i;
        }
    }
    return verses[index];
}

function drawText() {
    var textBox = textWidth(getLongestVerse(params.text));
    if (params.align === LEFT) {
        graphics.text(params.text, graphics.width / 2 - textBox / 2, graphics.height / 2);
    }

    if (params.align === CENTER) {
        graphics.text(params.text, graphics.width / 2, graphics.height / 2);
    }

    if (params.align === RIGHT) {
        graphics.text(params.text, graphics.width / 2 + textBox / 2, graphics.height / 2);
    }
}

function applyEffects() {
    graphics.loadPixels();
    outputGraphics.loadPixels();
    applyRowShiftPixels();
    outputGraphics.updatePixels();
    graphics.clear();
    applyColumnShiftPixels();
    graphics.updatePixels();

}

function applyRowShiftPixels() {
    var rowY, iteration = 0;
    for (rowY = 0; rowY < graphics.height - params.row.height; rowY += params.row.height) {
        if (iteration % 2 === 1) {
            copyPixels(graphics, outputGraphics, 0, rowY, graphics.width, params.row.height, params.row.shift, rowY);
        }
        else {
            copyPixels(graphics, outputGraphics, 0, rowY, graphics.width, params.row.height, 0, rowY);
        }
        iteration++;
    }
    copyPixels(graphics, outputGraphics, 0, rowY, graphics.width, graphics.height - rowY, 0, rowY);
}

function applyColumnShiftPixels() {
    var colX, iteration = 0;
    for (colX = 0; colX < graphics.width - params.column.width; colX += params.column.width) {
        var column = outputGraphics.get(colX, 0, params.column.width, graphics.height);
        if (iteration % 2 === 1) {
            copyPixels(outputGraphics, graphics, colX, 0, params.column.width, graphics.height, colX, params.column.shift);
        }
        else {
            copyPixels(outputGraphics, graphics, colX, 0, params.column.width, graphics.height, colX, 0);
        }
        iteration++;
    }
    copyPixels(outputGraphics, graphics, colX, 0, outputGraphics.width - colX, graphics.height, colX, 0);
}

function copyPixels(source, dest, sx, sy, sw, sh, dx, dy) {
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
}

function setPixels(source, sx, sy, sw, sh, value) {
    for (var x = 0; x < sw; x++) {
        for (var y = 0; y < sh; y++) {
            var sourceIndex = 4 * (x + sx + (y + sy) * source.width);
            source.pixels[sourceIndex] = value;
            source.pixels[sourceIndex + 1] = value;
            source.pixels[sourceIndex + 2] = value;
            source.pixels[sourceIndex + 3] = value;
        }
    }
}

function applyRGBShift(renderer) {
    var shift = 4 * (2 - 8 * renderer.width);
    var value = 100;
    for (var x = 0; x < renderer.width; x++) {
        for (var y = 0; y < renderer.height; y++) {
            var sourceIndex = 4 * (x + (y) * renderer.width);
            if (sourceIndex > 16) {
                if (renderer.pixels[sourceIndex + 3] > 0) {
                    renderer.pixels[sourceIndex - 16] = 255 - renderer.pixels[sourceIndex];
                    renderer.pixels[sourceIndex - 16 + 3] = renderer.pixels[sourceIndex + 3];

                    renderer.pixels[sourceIndex - shift + 1] = 255 - renderer.pixels[sourceIndex];
                    renderer.pixels[sourceIndex - shift + 3] = renderer.pixels[sourceIndex + 3];

                    renderer.pixels[sourceIndex - 12 + 2] = 255 - renderer.pixels[sourceIndex];
                    renderer.pixels[sourceIndex - 12 + 3] = renderer.pixels[sourceIndex + 3];
                }
            }
        }
    }
}

// params setters

function resetParams() {
    params.size = 60;
    params.lineHeight = 30;
    params.row.height = 15;
    params.row.shift = 0;
    params.column.width = 15;
    params.column.shift = 0;
    updateSliders();
    paramsChanged = true;
}

function randomParams() {
    params.size = round(random(25, 80));
    params.lineHeight = params.textSize + round(random(1, 50));
    params.row.height = round(random(10, 80));
    params.row.shift = round(random(3, 50));
    params.column.width = round(random(10, 80));
    params.column.shift = round(random(3, 50));
    updateSliders();
    paramsChanged = true;
}

function updateSliders() {
    $('#text-size-slider').val(params.size);
    $('#line-height-slider').val(params.lineHeight);
    $('#row-shift-slider').val(params.row.shift);
    $('#row-height-slider').val(params.row.height);
    $('#column-shift-slider').val(params.column.shift);
    $('#column-width-slider').val(params.column.width);
}


function setText(value) {
    params.text = value;
    paramsChanged = true;
}

function setColor(value) {
    params.color = value;
    paramsChanged = true;
}

function setTextSize(value) {
    params.textSize = Number(value);
    paramsChanged = true;
}

function setTextFont(value) {
    params.textFont = value;
    paramsChanged = true;
}

function setCustomTextFont(files) {
    if (files.length > 0) {
        var fontFile = files[0];
        var url = window.URL.createObjectURL(fontFile);
        params.textFont = loadFont(url, function () {
            paramsChanged = true;
        });
    }
}

function setLineHeight(value) {
    params.lineHeight = Number(value);
    paramsChanged = true;
}

function setAlign(value) {
    params.align = value;
    paramsChanged = true;
}

function setTextStyle(style) {
    if (params.style === style) {
        params.style = NORMAL;
    }
    else {
        params.style = style;
    }
    paramsChanged = true;
}

function setRowHeight(value) {
    params.row.height = Number(value);
    paramsChanged = true;
}

function setRowShift(value) {
    params.row.shift = Number(value);
    paramsChanged = true;
}

function setColumnWidth(value) {
    params.column.width = Number(value);
    paramsChanged = true;
}

function setColumnShift(value) {
    params.column.shift = Number(value);
    paramsChanged = true;
}
