varying vec2 vUv;
varying vec3 vPosition;

#define COLOR_TOP vec3(0.,0.38,0.69)
#define COLOR_CYAN vec3(0.039,0.843,1.)
#define COLOR_CYAN_BRIGHT vec3(0.27, 1.0, 1.0)
#define COLOR_SIDE_TOP (COLOR_TOP * 0.7) // slightly darker than COLOR_TOP
#define COLOR_SIDE_BOTTOM (COLOR_TOP * 0.4) // even more dark

#define SIDE_TOP_START 0.
#define SIDE_TOP_END -0.25

#define INNER_RADIUS 0.435
#define OUTER_RADIUS 0.455
#define RING_WIDTH 0.005
#define RIGHT_BLOOM_WIDTH 0.045

void main() {
    // Calculate distance from center of UV space
    vec2 center = vec2(0.5);
    float dist = distance(vUv, center);

    // Create smooth ring mask (hollow circle)
    float ring = smoothstep(INNER_RADIUS, INNER_RADIUS + RING_WIDTH, dist) * 
                smoothstep(OUTER_RADIUS + RING_WIDTH, OUTER_RADIUS, dist);
    float ringBloom = smoothstep(INNER_RADIUS, INNER_RADIUS + RIGHT_BLOOM_WIDTH, dist) *
                smoothstep(OUTER_RADIUS + RIGHT_BLOOM_WIDTH, OUTER_RADIUS, dist);
    ring += ringBloom * 0.5;

    float centerCircle = smoothstep(0.4, 0.1, dist);
    ring += centerCircle * 0.5;

    ring = min(1., ring);

    //mix side colors between pos.y -0.01 and -0.2
    float sideTop = smoothstep(SIDE_TOP_START, SIDE_TOP_END, vPosition.y);
    vec3 sideColor = mix(COLOR_SIDE_TOP, COLOR_SIDE_BOTTOM, sideTop);   

    vec3 baseColor = mix(sideColor, COLOR_TOP, smoothstep(-0.02, 0., vPosition.y));


    // Mix base color with cyan color based on ring mask
    vec3 color = mix(baseColor, COLOR_CYAN_BRIGHT, ring);

    gl_FragColor = vec4(color, 1.0);
}