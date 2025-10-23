#include <skinning_pars_vertex>
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vPosition;

uniform float uTime;

float random2D(vec2 value) {
    return fract(sin(dot(value.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    #include <skinbase_vertex>
    #include <begin_vertex>
    #include <skinning_vertex>
    
    // --- Glitch effect ---
    float glitchTime = uTime - transformed.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
    glitchStrength /= 2.0;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength); // threshold effect
    glitchStrength *= 0.02; // intensity
    transformed.x += (random2D(transformed.xz + uTime) - 0.5) * glitchStrength;
    transformed.z += (random2D(transformed.zx + uTime) - 0.5) * glitchStrength;
    // ---------------------

    #include <project_vertex>

    vec4 worldPosition = modelMatrix * vec4(transformed, 1.0);

    // Normal skinning
    vec4 skinnedNormal = vec4(0.0);
    skinnedNormal += boneMatX * vec4(normal, 0.0) * skinWeight.x;
    skinnedNormal += boneMatY * vec4(normal, 0.0) * skinWeight.y;
    skinnedNormal += boneMatZ * vec4(normal, 0.0) * skinWeight.z;
    skinnedNormal += boneMatW * vec4(normal, 0.0) * skinWeight.w;
    vNormal = skinnedNormal.xyz;

    vWorldPos = worldPosition.xyz;
    vPosition = transformed;
}