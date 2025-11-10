import EventEmitter from "./EventEmitter";

export const BREAKPOINTS = {
  sm: 480,
  md: 840,
  lg: 1024,
  xl: 1280,
} as const satisfies Record<string, number>;

const getBreakpoint = () => {
  return Object.keys(BREAKPOINTS).find((key) => window.innerWidth <= BREAKPOINTS[key as keyof typeof BREAKPOINTS]);
};

class Sizes extends EventEmitter<{
  resize: { width: number; height: number; pixelRatio: number };
  hide: void;
  show: void;
}> {
  width: number;
  height: number;
  pixelRatio: number;
  breakpoint: keyof typeof BREAKPOINTS;
  visible: boolean;
  aspectRatio: number;

  constructor() {
    super();
    this.width = 0;
    this.height = 0;
    this.aspectRatio = 0;
    this.pixelRatio = 1;
    this.breakpoint = "md";
    this.visible = true;

    this.resize();
  }

  init() {
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("visibilitychange", this.visibilityChange.bind(this));
    this.resize();
  }

  visibilityChange() {
    this.visible = document.visibilityState === "visible";
    if (this.visible) {
      this.emit("show");
    } else {
      this.emit("hide");
    }
  }

  atLeastBreakpoint(breakpoint: keyof typeof BREAKPOINTS) {
    return this.width >= BREAKPOINTS[breakpoint];
  }

  isLandscape() {
    return this.aspectRatio >= 1;
  }

  setViewportUnits() {
    document.documentElement.style.setProperty("--vh", 0.01 * window.innerHeight + "px");
    document.documentElement.style.setProperty("--dvh", 0.01 * window.innerHeight + "px");
    document.documentElement.style.setProperty("--svh", 0.01 * document.documentElement.clientHeight + "px");
    document.documentElement.style.setProperty("--lvh", "1vh");

    document.documentElement.style.setProperty("--vw", 0.01 * window.innerWidth + "px");
    document.documentElement.style.setProperty("--dvw", 0.01 * window.innerWidth + "px");
    document.documentElement.style.setProperty("--svw", 0.01 * document.documentElement.clientWidth + "px");
    document.documentElement.style.setProperty("--lvw", "1vw");
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspectRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.setViewportUnits();

    this.breakpoint = getBreakpoint() as keyof typeof BREAKPOINTS;

    this.emit("resize", { width: this.width, height: this.height, pixelRatio: this.pixelRatio });
  }

  destroy() {
    window.removeEventListener("resize", this.resize.bind(this));
  }
}

export const sizes = new Sizes();
