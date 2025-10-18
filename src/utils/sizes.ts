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
  canvas: HTMLCanvasElement | null = null;
  observer: ResizeObserver | null = null;

  constructor() {
    super();
    this.width = 0;
    this.height = 0;
    this.pixelRatio = 1;
    this.breakpoint = "md";
  }

  init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.observer = new ResizeObserver(this.resize.bind(this));
    this.observer.observe(this.canvas);
  }

  atLeastBreakpoint(breakpoint: keyof typeof breakpoints) {
    return this.width >= breakpoints[breakpoint];
  }

  setViewportUnits() {
    document.documentElement.style.setProperty("--vh", 0.01 * window.innerHeight + "px");
    document.documentElement.style.setProperty("--dvh", 0.01 * window.innerHeight + "px");
    document.documentElement.style.setProperty("--svh", 0.01 * document.documentElement.clientHeight + "px");
    document.documentElement.style.setProperty("--lvh", "1vh");
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.setViewportUnits();

    this.breakpoint = getBreakpoint() as keyof typeof breakpoints;

    this.emit("resize", { width: this.width, height: this.height, pixelRatio: this.pixelRatio });
  }

  destroy() {
    this.observer?.disconnect();
    this.observer = null;
  }
}

export const sizes = new Sizes();
