#include ../includes/avatar-progress/fragment.glsl;

uniform sampler2D uMatcap;

varying vec3 vViewNormal;
varying vec3 vViewPosition;
varying vec3 vNormal;

#define AMBIENT_COLOR vec3(0.,0.141,0.455)

void main() {
    vec3 viewDir = normalize(vViewPosition);

    vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
    vec3 y = cross(viewDir, x);
    vec2 uv = vec2(dot(x, vNormal), dot(y, vNormal)) * 0.495 + 0.5;

    vec3 matcapColor = texture2D(uMatcap, uv).rgb;

    //make a smooth transiiton between progress and progress + 0.01

    float smoothWidth = 0.002;
    float smoothProgress = smoothstep(uProgress, uProgress + smoothWidth, vModelProgress);

    matcapColor += AMBIENT_COLOR * uProgress;

    gl_FragColor = vec4(matcapColor, smoothProgress);
}