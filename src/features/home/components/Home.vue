<script setup lang="ts">
import Layout from "../../../components/Layout.vue";
import Hero from "./Hero.vue";
import About from "./About.vue";
//import AboutSections from "../features/about/Sections.vue";
import Projects from "./Projects.vue";
import Contact from "./Contact.vue";
import Footer from "../../../components/Footer.vue";
import { ref, onMounted, onUnmounted, watchEffect, computed, watch } from "vue";
import { three } from "../../../three";
import { animations } from "../../../animations";
import HeaderHome from "../../../components/HeaderHome.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import ScrollIcon from "../../../components/ScrollIcon.vue";
import { raycast } from "../../../three/utils/raycast";
import gsap from "gsap";
import { useAgent } from "../../../composables/useAgent";

const introRef = ref<HTMLElement | null>(null);
const stickyContentRef = ref<HTMLElement | null>(null);
const stickyObserver = ref<IntersectionObserver | null>(null);
const scrolledPastIntro = ref(false);
const projectsLoaded = ref(false);
const contactRef = ref<HTMLElement | null>(null);
const contactBottom = ref<number>(0);
const aboutSpacerRef = ref<HTMLElement | null>(null);
const isHoveringObject3D = ref<boolean>(false);
const { isTouch } = useAgent();

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  scrolledPastIntro.value = entries[0]?.isIntersecting ?? false;
};

const isStickyVisible = computed(() => {
  return scrolledPastIntro.value || !projectsLoaded.value;
});

watchEffect((onInvalidate) => {
  if (!contactRef.value || preloaderVisible.value) return;
  const updateContactBottomOffset = () => {
    if (!contactRef.value) return;
    const bounding = contactRef.value.getBoundingClientRect();
    const documentBottom = document.documentElement.scrollHeight;
    const elementBottom = bounding.bottom + window.scrollY;
    // distance from bottom of document to bottom of contact section
    contactBottom.value = documentBottom - elementBottom;
  };

  const observer = new ResizeObserver(updateContactBottomOffset);
  observer.observe(contactRef.value as HTMLElement);

  onInvalidate(() => {
    observer.disconnect();
  });
});

watch(projectsLoaded, (loaded) => {
  if (loaded) {
    animations.init();
  }
});

const updateCursor = () => {
  if (isTouch.value) return;
  const hoveringBox = raycast.getHoveringBox();
  const shouldBePointer = !!hoveringBox;

  if (shouldBePointer !== isHoveringObject3D.value) {
    isHoveringObject3D.value = shouldBePointer;
    document.documentElement.style.cursor = shouldBePointer ? "pointer" : "";
  }
};

onMounted(() => {

  stickyObserver.value = new IntersectionObserver(handleIntersection);
  stickyObserver.value.observe(introRef.value as HTMLElement);

  three.updateParent(stickyContentRef.value as HTMLElement);

  gsap.ticker.add(updateCursor);
});

onUnmounted(() => {

  stickyObserver.value?.disconnect();
  stickyObserver.value = null;

  document.documentElement.style.cursor = "";

  gsap.ticker.remove(updateCursor);
  animations.destroy();
});

const handleProjectsLoaded = () => {
  projectsLoaded.value = true;
};
</script>

<template>
  <div class="home-page">
    <ScrollIcon />
    <Layout>
      <div class="intro-wrapper" ref="introRef">
        <div
          class="intro-sticky"
          :class="{ 'intro-sticky-visible': isStickyVisible }"
          :style="{ '--contact-bottom': `${contactBottom}px` }"
        >
          <div
            ref="stickyContentRef"
            :class="['intro-sticky-content', { 'intro-sticky-content-contact': !isStickyVisible }]"
          ></div>
          <div :class="{ 'intro-about-hidden': !isStickyVisible }">
            <About :spacer-ref="aboutSpacerRef" />
          </div>
        </div>
        <Hero class="intro-hero" id="hero" />
        <div class="intro-wrapper-spacer"></div>
        <div class="about-spacer" ref="aboutSpacerRef" id="about"></div>
        <!--      <About :spacer-ref="aboutSpacerRef" />-->
      </div>
      <Projects id="projects" @loaded="handleProjectsLoaded" />
      <div ref="contactRef" class="home-contact">
        <Contact id="contact" v-if="projectsLoaded" />
      </div>
      <Footer :withSocial="false"></Footer>
    </Layout>
    <HeaderHome v-if="projectsLoaded" />
  </div>
</template>

<style scoped lang="scss">
.home {
  &-contact {
    width: 100%;
  }
}

.about-spacer {
  max-height: calc(var(--lvh) * 250);
  min-height: calc(var(--lvh) * 250);
}

.intro-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-spacer {
    display: none;

    @include mixins.mq("md") {
      display: block;
      height: 200px;
    }
  }
}

.intro-hero {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
  overflow: hidden;
}

.intro-about-hidden {
  visibility: hidden;
}

.intro-sticky {
  top: 0;
  left: 0;
  width: 100%;
  max-height: calc(var(--lvh) * 100);
  min-height: calc(var(--lvh) * 100);
  overflow: hidden;
  z-index: -1;
  display: flex;
  align-items: flex-end;

  &-visible {
    position: sticky;
  }
}

.intro-sticky-content {
  width: 100%;
  height: calc(var(--lvh) * 100);
  position: relative;
  contain: layout style paint;
  overflow: hidden;

  &-contact {
    position: absolute;
    bottom: var(--contact-bottom);
    left: 0;
    width: 100%;
    height: calc(var(--lvh) * 100);
  }
}
</style>
