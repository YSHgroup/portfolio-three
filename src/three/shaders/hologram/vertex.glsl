#include <skinning_pars_vertex>
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vPosition;

uniform float uTime;

float random2D(vec2 value)
{
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <skinning_vertex>
    #include <project_vertex>

    float glitchTime = uTime - transformed.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 20.) +  sin(glitchTime * 8.76);
    glitchStrength /= 3.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= 0.1;
    transformed.x += (random2D(transformed.xz + uTime) - 0.5) * glitchStrength;
    transformed.z += (random2D(transformed.zx + uTime) - 0.5) * glitchStrength;

    vec4 skinnedNormal = vec4(0.0);
    skinnedNormal += boneMatX * vec4(normal, 0.0) * skinWeight.x;
    skinnedNormal += boneMatY * vec4(normal, 0.0) * skinWeight.y;
    skinnedNormal += boneMatZ * vec4(normal, 0.0) * skinWeight.z;
    skinnedNormal += boneMatW * vec4(normal, 0.0) * skinWeight.w;
    vNormal = skinnedNormal.xyz;

    vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
    vPosition = transformed;
}