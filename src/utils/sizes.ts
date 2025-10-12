import EventEmitter from "./EventEmitter";

const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const satisfies Record<string, number>;

const getBreakpoint = () => {
  return Object.keys(breakpoints).find((key) => window.innerWidth <= breakpoints[key as keyof typeof breakpoints]);
};

class Sizes extends EventEmitter<{
  resize: { width: number; height: number; pixelRatio: number };
}> {
  width: number;
  height: number;
  pixelRatio: number;
  breakpoint: keyof typeof breakpoints;

  constructor() {
    super();
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.breakpoint = getBreakpoint() as keyof typeof breakpoints;
  }

  init() {
    this.resize();
    window.addEventListener("resize", this.resize.bind(this));
  }

  atLeastBreakpoint(breakpoint: keyof typeof breakpoints) {
    return this.width >= breakpoints[breakpoint];
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
