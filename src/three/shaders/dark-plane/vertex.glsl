uniform float uOffset;
uniform float uActive;

attribute vec3 activePosition;

void main()
{

    vec3 resolvedPosition = mix(position, activePosition, uActive);
    gl_Position = vec4(resolvedPosition.x, resolvedPosition.y + uOffset, resolvedPosition.z, 1.0);
}