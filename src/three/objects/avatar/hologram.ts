import { resources } from "../../../utils/resources";
import { Mesh, Matrix4, Vector3, BufferAttribute, Group, SkinnedMesh } from "three";
import { renderTarget } from "../../core/renderTarget";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { getMaterial as getHologramMaterial, uniforms as hologramUniforms } from "./hologram-material";
import gsap from "gsap";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { avatar } from ".";

import type { Material, BufferGeometry, Object3D, Skeleton } from "three";

const GEOMETRY_NAMES: string[] = ["black", "gray", "skin", "white", "head"];

let mesh: SkinnedMesh;
let material: Material;
let geometry: BufferGeometry;
let skeleton: Skeleton;

const transform = new Group();

const init = () => {
  setupSkeleton();
  setupGeometry();
  setupMesh();

  gsap.ticker.add(tick);
};

const setupSkeleton = () => {
  const resource = resources.items["avatar-model"];
  const cloned = cloneSkeleton(resource.scene.children[0]);
  const black: SkinnedMesh = cloned.getObjectByName("black") as SkinnedMesh;
  skeleton = black.skeleton;

  /**    this.skeleton.bones.forEach((bone: Bone) => {
      this.bones[bone.name.replace("bone-", "")] = bone;
    }); */
};

const setupGeometry = () => {
  const resource = resources.items["avatar-model"];
  const geometries: BufferGeometry[] = [];

  resource.scene.children[0].traverse((child: Object3D) => {
    if (child instanceof Mesh && GEOMETRY_NAMES.includes(child.name)) {
      const geometry = child.geometry.clone();
      geometries.push(geometry);
    }
  });

  //geometry = mergeGeometries(geometries).toNonIndexed();
  geometry = mergeGeometries(geometries);
  geometry.toNonIndexed();

  const vectors = [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)];

  const position = geometry.attributes.position!;
  const centers = new Float32Array(position.count * 3);

  for (let i = 0, l = position.count; i < l; i++) {
    vectors[i % 3]!.toArray(centers, i * 3);
  }

  geometry.setAttribute("center", new BufferAttribute(centers, 3));
};

const setupMesh = () => {
  material = getHologramMaterial();
  mesh = new SkinnedMesh(geometry, material);
  mesh.bind(skeleton, new Matrix4());
  mesh.add(skeleton.bones[0] as Object3D);
  const resource = resources.items["avatar-model"];

  mesh.rotation.copy(resource.scene.children[0].rotation);
  mesh.scale.copy(resource.scene.children[0].scale);
  mesh.rotation.z = 0;

  mesh.frustumCulled = false;

  renderTarget.scene.add(transform);
  transform.add(mesh);
};

const tick = () => {
  hologramUniforms.uTime.value = gsap.ticker.time;

  const { waypointsPosition, waypointsRotation } = avatar;

  transform.position.copy(waypointsPosition);
  transform.rotation.copy(waypointsRotation);
};

export const avatarHologram = { init, getMesh: () => mesh, getMaterial: () => material };
