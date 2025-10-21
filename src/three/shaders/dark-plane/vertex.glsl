varying vec2 vUv;

uniform float uInProgress;

void main()
{
    float inY = mix(-1.0, position.y, uInProgress);

    float isTopLeft = step(0.5, position.y) * step(position.x, 0.5);
    inY += 0.5 * isTopLeft * uInProgress;

    gl_Position = vec4(position.x, inY, position.z, 1.0);

    float yMin = -1.0;
    float yMax = 1.0;
    vUv = vec2(
        uv.x,
        (inY - yMin) / (yMax - yMin)
    );
}