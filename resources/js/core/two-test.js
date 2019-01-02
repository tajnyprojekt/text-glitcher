//
// var shader;
// function preload() {
//     // load the shader definitions from files
//     console.log('loading');
//     shader = loadShader('./resources/shader/shader.vert', './resources/shader/shader.frag');
// }
// function setup() {
//     createCanvas(100, 100, WEBGL);
//     // use the shader
//     // shader(shader);
//     // noStroke();
//     shader.setUniform('effect0', 1);
//     shader.setUniform('effect1', 1);
// }
//
// function draw() {
//     background(30);
//     fill(200, 134, 17);
//     stroke(255, 0, 255);
//     rect(0, 0, 40, 40);
//     filter(shader);
// }



var myShader;
var g;
function preload() {
    // load the shader definitions from files
    myShader = loadShader('./resources/shader/shader.vert', './resources/shader/shader.frag');
}
function setup() {
    createCanvas(100, 100, WEBGL);
    g = createGraphics(100, 100);
    g.pixelDensity(1);
    g.clear();
    g.fill(80);
    g.rect(10, 0, 20, 100);
    // use the shader
    shader(myShader);

}

function draw() {
    clear();
    myShader.setUniform('tex0', g);
    myShader.setUniform('mouseX', mouseX/width);
    rect(0,0,width, height);
}