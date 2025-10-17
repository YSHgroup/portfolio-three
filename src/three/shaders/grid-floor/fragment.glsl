varying vec2 vUv;

uniform vec3 uColor;
uniform vec3 uLineColor;

#define CELLS 20.0
#define LINE_WIDTH 0.01

void main() {
    vec2 coord = vUv * CELLS;
    vec2 grid = abs(fract(coord) - 0.5);

    float line = 1.0 - max(smoothstep(0.0, 0.5, grid.x), smoothstep(0.0, 0.5, grid.y));
    line = smoothstep(LINE_WIDTH - 0.01, LINE_WIDTH, line);

float distToCenter = distance(vUv, vec2(0.5));

    gl_FragColor = vec4(mix(uLineColor, uColor, line), 1.0);
}