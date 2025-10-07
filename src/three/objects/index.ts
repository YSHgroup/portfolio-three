import { cube } from "./cube";

const init = () => {
  cube.init();
};

const destroy = () => {
  cube.destroy();
};

export const objects = { init, destroy };
