#include ../includes/avatar-progress/fragment.glsl;

varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uTime;

#define LINE_WIDTH 0.003
#define FADE_WIDTH 0.02

// directional light
#define DIRECTIONAL_LIGHT_COLOR vec3(1.0, 0.6, 0.3)
#define DIRECTIONAL_LIGHT_DIR normalize(vec3(0.5, 0.5, 0.))

void main() {
    vec3 normal = normalize(vNormal);

    if(!gl_FrontFacing)
        normal *= -1.0;

    float progress = 1. - getProgress();

    float stripes = mod((vWorldPos.y - uTime * 0.1) * 30.0, 1.0);
    stripes = pow(stripes, 3.0);

    vec3 viewDir = normalize(cameraPosition - vWorldPos);

    float fresnel = pow(1.0 - dot(viewDir, normal), 2.);
    float falloff = smoothstep(0.8, 0.2, fresnel);

    float holographic = stripes * fresnel;
    holographic += fresnel;
    holographic += stripes * 0.02;
    holographic *= falloff;
    
    float dist = abs(vModelProgress - uProgress);
    float lineStrength = 1.0 - smoothstep(LINE_WIDTH - FADE_WIDTH, LINE_WIDTH + FADE_WIDTH, dist);

    if(!gl_FrontFacing)
        holographic *= 0.4;

    // --- Directional lighting ---
    float lightIntensity = max(dot(normal, DIRECTIONAL_LIGHT_DIR), 0.0);
    lightIntensity = smoothstep(0.3, 0.8, lightIntensity) * 0.8;

    // Combine with base color
    vec3 finalColor = mix(uColor, DIRECTIONAL_LIGHT_COLOR, lightIntensity);

    gl_FragColor = vec4(finalColor, min(holographic * progress + lineStrength, 1.0));
}