varying vec2 vUv;
varying vec3 vNormal;

uniform float uTime;
uniform float uProgress;

// tweakable constants
#define CURVE 0.04
#define CURVE_MIN 0.02
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
  pos.y += (curve * CURVE_MIN) + (curve * CURVE * uProgress) * zMask;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  vNormal = normal;
}