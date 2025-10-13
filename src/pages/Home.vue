<script setup lang="ts">
import Layout from "../components/Layout.vue";
import Hero from "../features/hero/Hero.vue";
import About from "../features/about/About.vue";
import Projects from "../features/projects/Projects.vue";
import Contact from "../features/contact/Contact.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <Layout>
    <Hero />
    <About />
    <Projects />
    <Contact />
    <Footer />
  </Layout>
</template>
