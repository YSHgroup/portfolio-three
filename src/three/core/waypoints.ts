// waypoints.ts
import { camera } from "./camera";
import { Vector3 } from "three";
import gsap from "gsap";
import { lenis } from "../../utils/scroll";

const points = [
  { t: 0, name: "hero", position: new Vector3(5.8, 5.7, 8.3), lookAt: new Vector3(-2.7, 2, 0) },
  { t: 0.5, name: "about-start", position: new Vector3(6.8, 0, 8.3), lookAt: new Vector3(-2.7, -3.7, 0) },
  { t: 1, name: "about-end", position: new Vector3(7.8, 0, 8.3), lookAt: new Vector3(-2.7, -3.7, 0) },
] as const satisfies { t: number; name: string; position: Vector3; lookAt: Vector3 }[];

const init = () => {
  gsap.ticker.add(tick);
};

const tick = () => {
  const { waypointGroup } = camera;
  const { progress } = lenis;

  const start = points.findLast((p) => p.t <= progress) ?? points[0];
  const end = points.find((p) => p.t > progress) ?? points[points.length - 1] ?? points[0];
  const segmentT = (progress - start.t) / Math.max(end.t - start.t, 0.0001);

  // Lerp position and store on waypointGroup
  const targetPos = new Vector3().lerpVectors(start.position, end.position, segmentT);
  waypointGroup.position.copy(targetPos);

  // Interpolated lookAt
  const look = new Vector3().lerpVectors(start.lookAt, end.lookAt, segmentT);
  waypointGroup.userData.lookAt = look;
};

export const waypoints = { init, points };
