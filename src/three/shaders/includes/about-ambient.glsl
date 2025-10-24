#define AMBIENT_COLOR vec3(0.,0.039,0.129)

vec3 applyAmbient(vec3 color) {
    return color + AMBIENT_COLOR * uProgress;
}