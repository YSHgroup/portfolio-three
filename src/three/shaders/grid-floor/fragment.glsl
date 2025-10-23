varying vec2 vUv;

uniform vec3 uColor;
uniform vec3 uLineColor;
uniform float uOpacity;
uniform float uTime;

#define CELLS 20.0
#define LINE_WIDTH 0.01
#define FOG_START 0.25

void main() {
    vec2 coord = vUv * CELLS;
    coord.y += uTime * 0.35;
    vec2 grid = abs(fract(coord) - 0.5);

    // grid lines
 
    //float line = max(smoothstep(0.0, 0.5, grid.x), smoothstep(0.0, 0.5, grid.y));
    float lineX = smoothstep(0.0, 0.5, grid.x);
    float lineY = smoothstep(0.0, 0.5, grid.y);
    float dots = lineX * lineY;
    dots = smoothstep(LINE_WIDTH - 0.005, LINE_WIDTH, 1. - dots);
    dots = 1. - dots;

    float halfLineWidth = LINE_WIDTH * 0.5;
    float lines = max(lineX, lineY);
    lines = smoothstep(halfLineWidth - 0.005, halfLineWidth, 1. - lines);
    lines = 1. - lines;
    lines *= 0.1;

    float pattern = max(dots, lines);
    
    // fade to edges
    float distToCenter = distance(vUv, vec2(0.5));
    float alpha = 1.0 - smoothstep(FOG_START * 0.5, 0.5, distToCenter);

    gl_FragColor = vec4(mix(uColor, uLineColor, pattern), alpha * uOpacity);
}