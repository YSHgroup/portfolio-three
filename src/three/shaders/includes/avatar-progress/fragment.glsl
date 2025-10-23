varying float vModelProgress;

uniform float uProgress;

float getProgress() {
    return step(uProgress, vModelProgress);
}