<script setup lang="ts">
import LayoutContent from "../../components/LayoutContent.vue";
</script>

<template>
  <div class="hero">
    <LayoutContent>
      <h1 class="hero-title">David</h1>
    </LayoutContent>
  </div>
</template>

<style scoped lang="scss">
.hero {
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &-title {
    font-size: 80px;
    font-weight: 800;
    letter-spacing: 2px;
  }
}
</style>
