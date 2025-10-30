<script setup lang="ts">
import Layout from "../components/Layout.vue";
import Hero from "../features/hero/Hero.vue";
import About from "../features/about/About.vue";
//import AboutSections from "../features/about/Sections.vue";
import Projects from "../features/projects/components/Projects.vue";
import Contact from "../features/contact/Contact.vue";
import Footer from "../components/Footer.vue";
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import { three } from "../three";
import { animations } from "../animations";
import HeaderHome from "../components/HeaderHome.vue";

const introRef = ref<HTMLElement | null>(null);
const stickyContentRef = ref<HTMLElement | null>(null);
const stickyObserver = ref<IntersectionObserver | null>(null);
const isStickyVisible = ref(false);
const projectsLoaded = ref(false);
const contactRef = ref<HTMLElement | null>(null);
const contactBottom = ref<number>(0);

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  isStickyVisible.value = entries[0]?.isIntersecting ?? false;
};

watchEffect((onInvalidate) => {
  if (!contactRef.value) return;
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

onMounted(() => {
  three.setActive(true);

  stickyObserver.value = new IntersectionObserver(handleIntersection);
  stickyObserver.value.observe(introRef.value as HTMLElement);
});

onUnmounted(() => {
  three.setActive(false);

  stickyObserver.value?.disconnect();
  stickyObserver.value = null;
});

onMounted(() => {
  three.updateParent(stickyContentRef.value as HTMLElement);
  animations.init();
});

onUnmounted(() => {
  animations.destroy();
});

const handleProjectsLoaded = () => {
  projectsLoaded.value = true;
};
</script>

<template>
  <HeaderHome v-if="projectsLoaded" />
  <Layout>
    <div class="intro-wrapper" ref="introRef">
      <Hero class="intro-hero" id="hero" />
      <div
        class="intro-sticky"
        :class="{ 'intro-sticky-visible': isStickyVisible }"
        :style="{ '--contact-bottom': `${contactBottom}px` }"
      >
        <div
          ref="stickyContentRef"
          :class="['intro-sticky-content', { 'intro-sticky-content-fixed': !isStickyVisible }]"
        ></div>
      </div>
      <div class="intro-wrapper-spacer"></div>
      <About />
      <!--      <AboutSections />-->
    </div>
    <Projects id="projects" @loaded="handleProjectsLoaded" />
    <div ref="contactRef" class="home-contact">
      <Contact id="contact" v-if="projectsLoaded" />
    </div>
    <Footer :withSocial="false"></Footer>
  </Layout>
</template>

<style scoped lang="scss">
.home {
  &-contact {
    width: 100%;
  }
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
}

.intro-sticky {
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--lvh) * 100);
  z-index: -1;
  display: flex;
  align-items: flex-end;

  &-visible {
    position: sticky;
  }
}

.intro-sticky-content {
  width: 100%;
  height: 100%;

  &-fixed {
    position: absolute;
    bottom: var(--contact-bottom);
    left: 0;
    width: 100%;
    height: calc(var(--lvh) * 100);
  }
}
</style>
