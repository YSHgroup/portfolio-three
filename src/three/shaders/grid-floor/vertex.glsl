varying vec2 vUv;

uniform float uTime;
uniform float uProgress;

// tweakable constants
#define CURVE 0.06
#define X_WEIGHT 0.25  // reduce X influence
#define Z_WEIGHT 1.0  // full Z influence

void main() {
  vUv = uv;
  vec3 pos = position;

  // weighted distance: X is weaker than Z
  float dist = sqrt(pos.x * pos.x * X_WEIGHT + pos.z * pos.z * Z_WEIGHT);
  float curve = pow(dist, 2.0);

  // only apply when z > 0 (smooth fade near z = 0)
  float zMask = smoothstep(1., 0.0, pos.z);

  // apply curve
  pos.y += (curve * CURVE) * zMask;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}