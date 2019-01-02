function ShiftGlitchFilter() {
    var vertexShader = null;

    var fragmentShader = [
       '// precision highp float;\n' +
       '\n' +
       'varying vec2 vTextureCoord;\n' +
       'uniform sampler2D uSampler;\n' +
       '\n' +
       'uniform vec4 filterArea;\n' +
       'uniform vec4 filterClamp;\n' +
       'uniform vec2 dimensions;\n' +
       '\n' +
       'uniform int cShift;\n' +
       '\n' +
       '\n' +
       'void main(void) {\n' +
       '\n' +
       '//    vec2 pixelCoord = vTextureCoord * filterArea.xy;\n' +
       '//    vec2 normalizedCoord = pixelCoord / dimensions;\n' +
       '//\n' +
       '//    vec2 rSource = clamp(vTextureCoord + vec2(0.001, 0.002), vec2(0.0, 0.0), vec2(1.0, 1.0));\n' +
       '//    vec2 gSource = clamp(vTextureCoord + vec2(-0.001, 0.004), vec2(0.0, 0.0), vec2(1.0, 1.0));\n' +
       '//    vec2 bSource = clamp(vTextureCoord + vec2(-0.002, -0.001), vec2(0.0, 0.0), vec2(1.0, 1.0));\n' +
       '//\n' +
       '//\n' +
       '//    vec4 outputColor = vec4(0.0);\n' +
       '//\n' +
       '//    vec4 rPixel = texture2D(uSampler, rSource);\n' +
       '//    vec4 gPixel = texture2D(uSampler, gSource);\n' +
       '//    vec4 bPixel = texture2D(uSampler, bSource);\n' +
       '//\n' +
       '//    vec4 currentPixel = texture2D(uSampler, vTextureCoord);\n' +
       '//\n' +
       '//    if (currentPixel.a != 0.0) {\n' +
       '//        gl_FragColor = currentPixel;\n' +
       '//        return;\n' +
       '//    }\n' +
       '//\n' +
       '//    if (currentPixel.a == 0.0 && (rPixel.a != 0.0 || gPixel.a != 0.0 || gPixel.a != 0.0)) {\n' +
       '//        outputColor.a = 0.5;\n' +
       '//    }\n' +
       '//    else {\n' +
       '//        outputColor.a = 0.0;\n' +
       '//    }\n' +
       '//\n' +
       '//    outputColor.r = rPixel.r;\n' +
       '//    outputColor.g = rPixel.g;\n' +
       '//    outputColor.b = rPixel.b;\n' +
       '//\n' +
       '//    if (rPixel.a != 0.0 && rPixel.r == 0.0) {\n' +
       '//        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);\n' +
       '//        return;\n' +
       '//    }\n' +
       '//    if (gPixel.a != 0.0 && gPixel.g == 0.0) {\n' +
       '//        gl_FragColor = vec4(0.0, 1.0, 0.0, 0.5);\n' +
       '////        outputColor.g = 1.0;\n' +
       '//           return;\n' +
       '// }\n' +
       '//    if (bPixel.a != 0.0 && bPixel.b == 0.0) {\n' +
       '//        gl_FragColor = vec4(0.0, 0.0, 1.0, 0.5);\n' +
       '////        outputColor.b = 1.0;\n' +
       '//            return;\n' +
       '//}\n' +
       '\n' +
       '\n' +
       '    vec2 red = float(cShift) * vec2(1.1, 0.8);\n' +
       '    vec2 green = float(cShift) * vec2(1.4, 1.1);\n' +
       '    vec2 blue = float(cShift) * vec2(0.7, 0.5);\n' +
       '\n' +
       '    gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n' +
       '    gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n' +
       '    gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n' +
       '    gl_FragColor.a = 1.0;//texture2D(uSampler, vTextureCoord).a;\n' +
       '}'
    ].join();

    var uniforms = {
        hShift: {
            type: 'int',
            value: 0
        },
        hSize: {
            type: 'int',
            value: 40
        },
        vShift: {
            type: 'int',
            value: 0
        },
        vSize: {
            type: 'int',
            value: 40
        },
        cShift: {
            type: 'int',
            value: 0
        }
    };

    PIXI.AbstractFilter.call(this, vertexShader, fragmentShader, uniforms);
}

ShiftGlitchFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
ShiftGlitchFilter.prototype.constructor = ShiftGlitchFilter;

Object.defineProperties(ShiftGlitchFilter.prototype, {
    hShift: {
        get: function() {
            return this.uniforms.hShift.value;
        },
        set: function(value) {
            this.uniforms.hShift.value = value;
        }
    },
    hSize: {
        get: function() {
            return this.uniforms.hSize.value;
        },
        set: function(value) {
            this.uniforms.hSize.value = value;
        }
    },
    vShift: {
        get: function() {
            return this.uniforms.vShift.value;
        },
        set: function(value) {
            this.uniforms.vShift.value = value;
        }
    },
    vSize: {
        get: function() {
            return this.uniforms.vSize.value;
        },
        set: function(value) {
            this.uniforms.vSize.value = value;
        }
    },
    cShift: {
        get: function() {
            return this.uniforms.cShift.value;
        },
        set: function(value) {
            this.uniforms.cShift.value = value;
        }
    }

});