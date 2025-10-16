varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec3 uVignetteColor;

void main() {
    vec4 color = texture2D(uTexture, vUv);

    float distToCenter = distance(vUv, vec2(0.5, 0.5));
    distToCenter = smoothstep(0.4, .9, distToCenter);
    color.rgb = mix(color.rgb, uVignetteColor, distToCenter);

    gl_FragColor = vec4(color.rgb, 1.);
}