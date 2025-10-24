varying float vModelProgress;

uniform float uProgress;

#define SMOOTH_WIDTH 0.002

float getProgress() {
    return smoothstep(uProgress, uProgress + SMOOTH_WIDTH, vModelProgress);
}