import EventEmitter from "../../utils/EventEmitter";

class ThreeSizes extends EventEmitter<{
  resize: { width: number; height: number; pixelRatio: number };
}> {
  width: number = 0;
  height: number = 0;
  pixelRatio: number = 1;
  canvas: HTMLCanvasElement | null = null;
  observer: ResizeObserver | null = null;

  init(_canvas: HTMLCanvasElement) {
    this.canvas = _canvas;
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.emit("resize", { width: this.width, height: this.height, pixelRatio: this.pixelRatio });
  }

  destroy() {
    window.removeEventListener("resize", this.resize.bind(this));
    this.canvas = null;
  }
}

export const threeSizes = new ThreeSizes();
