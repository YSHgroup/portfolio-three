#include ../includes/avatar-progress/fragment.glsl;

uniform sampler2D uHeadTexture;
uniform vec2 uHeadTextureSize;

varying vec2 vUv;

void main() {
    vec4 tex = texture2D(uHeadTexture, vUv);

    float progress = getProgress();

    gl_FragColor = vec4(tex.rgb, progress);
}