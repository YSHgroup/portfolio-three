varying float vModelProgress;

float getModelProgress(vec3 position, float worldY) {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    float modelProgress = (worldY + 0.2) / 4.7;
    return modelProgress;
}