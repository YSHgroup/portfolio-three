varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uIndex; // which tile you want to sample (0–15 for 4x4)
#define ROWS 4.
#define COLUMNS 4.

void main() {
  // Calculate tile position
  float column = mod(uIndex, COLUMNS);
  float row = floor(uIndex / COLUMNS);

  // Flip Y because texture atlases often start from top-left
  row = (ROWS - 1.0) - row;

  // Scale UVs to a single tile
  vec2 uv = vUv;
  uv.x = (uv.x + column) / COLUMNS;
  uv.y = (uv.y + row) / ROWS;

  vec4 textureColor = texture2D(uTexture, uv);
  gl_FragColor = textureColor;
}