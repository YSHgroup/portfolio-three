uniform sampler2D uTexture;
uniform float uScrollDepth;

varying vec2 vUv;
varying float vScrollIntensity;

void main() {
    vec2 offsetUv = vec2(vUv.x, vUv.y + uScrollDepth * vScrollIntensity);
    vec3 color = texture2D(uTexture, offsetUv).rgb;

    gl_FragColor = vec4(color, 1.0);
}