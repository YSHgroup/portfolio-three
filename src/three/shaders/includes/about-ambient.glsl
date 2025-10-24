#define AMBIENT_COLOR vec3(0.,0.027,0.099)

vec3 applyAmbient(vec3 color) {
    return color + AMBIENT_COLOR * uProgress;
}