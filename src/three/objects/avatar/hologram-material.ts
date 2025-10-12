import { MeshBasicMaterial } from "three";

let material: MeshBasicMaterial;

const uniforms = {
  uTime: { value: 0 },
  uOpacity: { value: 0 },
};

const getMaterial = () => {
  if (material) return material;

  material = new MeshBasicMaterial({
    transparent: true,
    blending: 2,
    color: "rgb(0, 213, 255)",
    alphaToCoverage: true,
  });

  material.onBeforeCompile = (shader) => {
    // Add custom uniforms
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uOpacity = uniforms.uOpacity;

    // Inject vertex shader logic
    shader.vertexShader = shader.vertexShader
      .replace(
        `#include <common>`,
        `#include <common>
      
      uniform float uTime;

      attribute vec3 center;

      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec3 vCenter;
      varying vec4 vClipPos;

      // random2D helper
      float random2D(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      `,
      )
      .replace(
        `#include <begin_vertex>`,
        `
        vec4 modelPosition = vec4(position, 1.0);

        vec3 transformed = position;

        // World-space position
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vPosition = worldPosition.xyz;

        vNormal = normalize(mat3(modelMatrix) * normal);
        vClipPos = projectionMatrix * viewMatrix * worldPosition;
        vCenter = center;
      `,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        `#include <common>`,
        `#include <common>
  
        uniform float uOpacity;
        uniform float uTime;

        varying vec3 vPosition;
        varying vec3 vCenter;
        varying vec4 vClipPos;

        #define THICKNESS .75
        `,
      )
      .replace(
        "#include <color_fragment>",
        `
        #include <color_fragment>

 		vec3 afwidth = fwidth( vCenter.xyz );

		vec3 edge3 = smoothstep( ( THICKNESS - 1.0 ) * afwidth, THICKNESS * afwidth, vCenter.xyz );

        vec3 light3 = smoothstep(vec3(0.0), vec3(0.4), vCenter.xyz);


		float edge = 1.0 - min( min( edge3.x, edge3.y ), edge3.z );
        float light = 1.0 - min( min( light3.x, light3.y ), light3.z );

        diffuseColor.a = uOpacity * (edge + light * .3);
        `,
      );
  };

  material.depthTest = false;

  return material;
};

export { getMaterial, uniforms };
