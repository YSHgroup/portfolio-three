varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vPosition;

uniform vec3 uColor;
uniform float uTime;

#define FRESNEL_POWER 2.

void main() {
    vec3 normal = normalize(vNormal);

    if(!gl_FrontFacing)
        normal *= - 1.0;

    float stripes = mod((vWorldPos.y - uTime * 0.05) * 20.0, 1.0);
    stripes = pow(stripes, 3.0);

    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    
    float fresnel = pow(1.0 - dot(viewDir, normal), FRESNEL_POWER);

    float falloff = smoothstep(0.8, 0.2, fresnel);

    float holographic = stripes * fresnel;
    holographic += fresnel;
    holographic *= falloff;

    if(!gl_FrontFacing)
        holographic *= 0.5;

    gl_FragColor = vec4(uColor, holographic);
}