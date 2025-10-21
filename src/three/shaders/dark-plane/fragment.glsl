varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec3 uVignetteColor;
uniform float uInProgress;

/**float wave(vec2 p, float strength) {
    float x = p.x * 8.0;
    float y = p.y * 2.0;

    float n =
        sin(x * 1.1 + sin(y * 1.3)) +
        0.6 * sin(x * 2.7 - y * 0.7 + sin(x * 0.5)) +
        0.4 * sin(x * 4.3 + y * 1.9 + sin(x * 2.1 + y * 0.3));

    n = (n + 2.0) / 4.0; // maps [-2, +2] → [0, 1]

    return n * 0.04 * strength;
}*/

void main() {
    vec4 color = texture2D(uTexture, vUv);

    float distToCenter = distance(vUv, vec2(0.5));
    distToCenter = smoothstep(0.5, 0.9, distToCenter);
    color.rgb = mix(color.rgb, uVignetteColor, distToCenter);

    //vec2 uv = vUv;
    //uv.y -= 0.3 * (1. -uv.x) * uInProgress;

    //float offset = wave(uv, 10. * uInProgress * (1. - uv.x));
    //float strength = smoothstep(uv.y - 0.002, uv.y, uInProgress + offset);

    gl_FragColor = vec4(color.rgb, 1.);
}