varying vec2 vUv;
varying vec3 vPosition;

uniform sampler2D uTexture;
uniform float uInProgress;
uniform float uOutProgress;

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

    bloom /= 25.0; 

    float brightness = max(max(color.r, color.g), color.b);
    bloom *= smoothstep(0.1, .5, brightness); 

    vec3 finalColor = color.rgb + bloom * 1.2;

    gl_FragColor = vec4(finalColor, 1.);
}