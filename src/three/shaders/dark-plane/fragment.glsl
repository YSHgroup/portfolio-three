varying vec2 vUv;

uniform sampler2D uTexture;

void main() {
    vec4 color = texture2D(uTexture, vUv);

    // Simple bloom approximation by sampling neighboring pixels
    float radius = 0.002;  // smaller = sharper bloom, larger = softer
    vec3 bloom = vec3(0.0);
    
    // Sample a small kernel around the pixel
    for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
            vec2 offset = vec2(float(x), float(y)) * radius;
            bloom += texture2D(uTexture, vUv + offset).rgb;
        }
    }

    bloom /= 50.0; // normalize samples

    // Extract bright areas only (threshold)
    float brightness = max(max(color.r, color.g), color.b);
    bloom *= smoothstep(0.1, .5, brightness); // adjust 0.7–1.0 threshold

    // Combine original + bloom
    vec3 finalColor = color.rgb + bloom * 1.5; // intensity multiplier

    gl_FragColor = vec4(finalColor, color.a);
}