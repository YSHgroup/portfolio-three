import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, watch, type Ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { projectId } from "./useRouteObserver";

export const lenisHome = ref<Lenis | null>(null);
export const lenisProject = ref<Lenis | null>(null);
export const velocity = ref(0);

const handleScroll = () => {
  ScrollTrigger.update();
};

const createNewLenis = () => {
  lenisHome.value = new Lenis({
    anchors: { lerp: 0.08 },
  });

  lenisHome.value.on("scroll", handleScroll);
};

interface Props {
  projectWrapperRef: Ref<HTMLElement | null>;
  projectContentRef: Ref<HTMLElement | null>;
}

export const useScroll = ({ projectWrapperRef, projectContentRef }: Props) => {
  const tick = (time: number) => {
    const instance = projectId.value === null ? lenisHome.value : lenisProject.value;
    if (!instance) return;

    if (instance.isScrolling === "smooth" && Math.abs(instance.velocity) > 0) {
      velocity.value = Math.min(Math.abs(instance.velocity * 0.75) || 0, 1);
    }

    instance.raf(time * 1000);
  };

  onMounted(() => {
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    createNewLenis();

    lenisHome.value = new Lenis({
      anchors: { lerp: 0.08 },
    });

    lenisProject.value = new Lenis({
      anchors: { lerp: 0.08 },
      wrapper: projectWrapperRef.value!,
      content: projectContentRef.value!,
    });

    lenisHome.value.on("scroll", handleScroll);
    lenisProject.value.on("scroll", handleScroll);
  });

  watch(projectId, (newProjectId) => {
    if (newProjectId === null) {
      lenisProject?.value?.stop();
      lenisHome?.value?.start();
    } else {
      lenisHome?.value?.stop();
      lenisProject?.value?.start();
    }
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
  });
};
