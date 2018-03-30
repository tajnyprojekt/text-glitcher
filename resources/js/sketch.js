
var graphics;
var paramsChanged = false;

var params = {
    text: '',
    color: '#000000',
    textSize: 60,
    textFont: 'Arial',
    lineHeight: 30,
    row: {
        height: 15,
        shift: 0
    },
    column: {
        width: 15,
        shift: 0
    }
};

// main functions
var canvas
function setup() {
    var canvasContainer = document.getElementById('canvas-wrapper');
    canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent('canvas-wrapper');
    graphics = createGraphics(canvasContainer.offsetWidth / 2, canvasContainer.offsetHeight / 2);
    // frameRate(10);
    stroke('#b3b3b3');
    fill('#b3b3b3');
    textSize(60);
    textFont('Courier New');
    textAlign(CENTER, CENTER);
    text('Start typing\nyour text', width / 2, height / 2);
}

function draw() {
    if (paramsChanged) {
        background(255);
        // graphics.background(255);
        drawOnGraphics();
        image(graphics, width / 4, height / 4);
        paramsChanged = false;

        if (params.text == '') {
            stroke('#b3b3b3');
            fill('#b3b3b3');
            textSize(60);
            textFont('Courier New');
            textAlign(CENTER, CENTER);
            text('Start typing\nyour text', width / 2, height / 2);
        }
    }
}

function keyTyped() {

    if (keyCode === ENTER) {
        params.text += '\n';
        paramsChanged = true;
    }
    else if (keyCode === BACKSPACE) {
        params.text = params.text.slice(0, -1);
        paramsChanged = true;
    }
    else {
        params.text += key;
        paramsChanged = true;
    }
}

var semaphore = true;
function download() {
    if (semaphore) {
        semaphore = false;
        background(255);
        clear();
        drawOnGraphics();
        image(graphics, width / 4, height / 4);
        save('myGltchedText.png');
        semaphore = true;
    }
}

// custom functions

function drawOnGraphics() {
    graphics.background(255);
    // graphics.clear();
    style();
    drawText();
    applyEffects();
}

function style() {
    graphics.stroke(params.color);
    graphics.fill(params.color);
    graphics.textSize(params.textSize);
    graphics.textFont(params.textFont);
    graphics.textAlign(CENTER, CENTER);
}

function drawText() {
    console.log('draw text: ' + params.text);
    graphics.text(params.text, graphics.width / 2, graphics.height / 2);
}

function applyEffects() {
    graphics.loadPixels();

    applyRowShift();
    applyColumnShift();

    graphics.updatePixels();
}

function applyRowShift() {
    for (var i = 0; i < graphics.height - 2 * params.row.height; i += 2 * params.row.height) {
        var row = graphics.get(0, i, graphics.width, i + params.row.height);
        graphics.set(params.row.shift, i, row);
    }
}

function applyColumnShift() {
    for (var i = 0; i < graphics.width - 2 * params.column.width; i += 2 * params.column.width) {
        var column = graphics.get(i, 0, i + params.column.width, graphics.height);
        graphics.set(i, params.column.shift, column);
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
    paramsChanged = true;
}

function randomParams() {
    params.size = round(random(25, 80));
    params.lineHeight = params.textSize + round(random(1, 50));
    params.row.height = round(random(10, 80));
    params.row.shift = round(random(3, 50));
    params.column.width = round(random(10, 80));
    params.column.shift = round(random(3, 50));
    paramsChanged = true;
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

function setLineHeight(value) {
    params.lineHeight = Number(value);
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
