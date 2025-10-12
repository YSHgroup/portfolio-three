uniform float uOffset;
uniform float uActive;

attribute vec3 activePosition;

varying vec2 vUv;

void main()
{
    vec3 resolvedPosition = mix(position, activePosition, uActive);
    gl_Position = vec4(resolvedPosition.x, resolvedPosition.y + uOffset, resolvedPosition.z, 1.0);

    vUv = uv;
}