import EventEmitter from "./EventEmitter";

class Sizes extends EventEmitter<{
  resize: { width: number; height: number; pixelRatio: number };
}> {
  width: number;
  height: number;
  pixelRatio: number;

  constructor() {
    super();
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
  }

  init() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.emit("resize", { width: this.width, height: this.height, pixelRatio: this.pixelRatio });
  }

  destroy() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
}

export const sizes = new Sizes();
