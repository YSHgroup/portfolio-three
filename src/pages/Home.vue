<script setup lang="ts">
import Layout from "../components/Layout.vue";
import Hero from "../features/hero/Hero.vue";
import About from "../features/about/About.vue";
import AboutSections from "../features/about/Sections.vue";
import Projects from "../features/projects/components/Projects.vue";
import Contact from "../features/contact/Contact.vue";
import Footer from "../components/Footer.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { three } from "../three";
import { animations } from "../animations";
import HeaderHome from "../components/HeaderHome.vue";

const stickyRef = ref<HTMLElement | null>(null);
const stickyContentRef = ref<HTMLElement | null>(null);
const observer = ref<IntersectionObserver | null>(null);
const isStickyVisible = ref(false);

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  isStickyVisible.value = entries[0]?.isIntersecting ?? false;
};

onMounted(() => {
  three.setActive(true);

  observer.value = new IntersectionObserver(handleIntersection);
  observer.value.observe(stickyRef.value as HTMLElement);
});

onUnmounted(() => {
  three.setActive(false);

  observer.value?.disconnect();
  observer.value = null;
});

onMounted(() => {
  three.updateParent(stickyContentRef.value as HTMLElement);
  animations.init();
});

onUnmounted(() => {
  animations.destroy();
});

const stickyContentClassNames = computed(() => {
  return {
    "intro-sticky-content": true,
    "intro-sticky-content-fixed": !isStickyVisible.value,
  };
});
</script>

<template>
  <HeaderHome />
  <Layout>
    <div class="intro-wrapper">
      <Hero class="intro-hero" />
      <div class="intro-sticky" ref="stickyRef">
        <div ref="stickyContentRef" :class="stickyContentClassNames"></div>
      </div>
      <div class="intro-wrapper-spacer"></div>
      <About />
      <AboutSections />
    </div>
    <Projects />
    <Contact />
    <Footer />
  </Layout>
</template>

<style scoped lang="scss">
.intro-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  &-spacer {
    height: 200px;
  }
}

.intro-hero {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.intro-sticky {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--lvh) * 100);
  z-index: -1;
  display: flex;
  align-items: flex-end;
}

.intro-sticky-content {
  width: 100%;
  height: 100%;

  &-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(var(--lvh) * 100);
  }
}
</style>
