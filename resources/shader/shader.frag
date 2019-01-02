// precision highp float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform vec4 filterArea;
uniform vec4 filterClamp;
uniform vec2 dimensions;

uniform int cShift;


void main(void) {

//    vec2 pixelCoord = vTextureCoord * filterArea.xy;
//    vec2 normalizedCoord = pixelCoord / dimensions;
//
//    vec2 rSource = clamp(vTextureCoord + vec2(0.001, 0.002), vec2(0.0, 0.0), vec2(1.0, 1.0));
//    vec2 gSource = clamp(vTextureCoord + vec2(-0.001, 0.004), vec2(0.0, 0.0), vec2(1.0, 1.0));
//    vec2 bSource = clamp(vTextureCoord + vec2(-0.002, -0.001), vec2(0.0, 0.0), vec2(1.0, 1.0));
//
//
//    vec4 outputColor = vec4(0.0);
//
//    vec4 rPixel = texture2D(uSampler, rSource);
//    vec4 gPixel = texture2D(uSampler, gSource);
//    vec4 bPixel = texture2D(uSampler, bSource);
//
//    vec4 currentPixel = texture2D(uSampler, vTextureCoord);
//
//    if (currentPixel.a != 0.0) {
//        gl_FragColor = currentPixel;
//        return;
//    }
//
//    if (currentPixel.a == 0.0 && (rPixel.a != 0.0 || gPixel.a != 0.0 || gPixel.a != 0.0)) {
//        outputColor.a = 0.5;
//    }
//    else {
//        outputColor.a = 0.0;
//    }
//
//    outputColor.r = rPixel.r;
//    outputColor.g = rPixel.g;
//    outputColor.b = rPixel.b;
//
//    if (rPixel.a != 0.0 && rPixel.r == 0.0) {
//        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
//        return;
//    }
//    if (gPixel.a != 0.0 && gPixel.g == 0.0) {
//        gl_FragColor = vec4(0.0, 1.0, 0.0, 0.5);
////        outputColor.g = 1.0;
//           return;
// }
//    if (bPixel.a != 0.0 && bPixel.b == 0.0) {
//        gl_FragColor = vec4(0.0, 0.0, 1.0, 0.5);
////        outputColor.b = 1.0;
//            return;
//}


    vec2 red = cShift * vec2(-1, -1);
    vec2 green = cShift * vec2(1, -1);
    vec2 blue = cShift * vec2(1, 1);

    gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;
    gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;
    gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;
    gl_FragColor.a = 0.5;//texture2D(uSampler, vTextureCoord).a;
}