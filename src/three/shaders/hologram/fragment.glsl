#include ../includes/avatar-progress/fragment.glsl;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uTime;

void main() {
    vec3 normal = normalize(vNormal);

    if(!gl_FrontFacing)
        normal *= - 1.0;

    float progress = 1. - getProgress();

    float stripes = mod((vWorldPos.y - uTime * 0.1) * 30.0, 1.0);
    stripes = pow(stripes, 3.0);
    stripes *= progress;

    vec3 viewDir = normalize(cameraPosition - vWorldPos);

    float fresnel = pow(1.0 - dot(viewDir, normal), 3. - progress * 1.);

    float falloff = smoothstep(0.8, 0.2, fresnel);

    float holographic = stripes * fresnel;
    holographic += fresnel;
    holographic += stripes * 0.1;
    holographic *= falloff;

    // draw small horizontal line centered at uProgress
    float lineWidth = 0.001; // total height of the line
    float fadeWidth = 0.01; // soft fade on edges

    float dist = abs(vModelProgress - uProgress);
    float lineStrength = 1.0 - smoothstep(lineWidth - fadeWidth, lineWidth + fadeWidth, dist);

    if(!gl_FrontFacing)
        holographic *= 0.2 + 0.2 * progress;

    gl_FragColor = vec4(uColor, min(holographic + lineStrength, 1.));
    //gl_FragColor = vec4(vec3(progress), 1.);
}