varying vec2 vUv;
varying vec3 vPosition;

#define COLOR vec3(0.1,0.808,1.)

void main() {
  gl_FragColor = vec4(COLOR, (1. - vPosition.y) * 0.5);
}
