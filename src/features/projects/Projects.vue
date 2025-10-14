<script setup lang="ts">
import LayoutContent from "../../components/LayoutContent.vue";
</script>

<template>
  <div class="projects">
    <LayoutContent size="xxl" class="projects-content">
      <p>Projects</p>
    </LayoutContent>
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  width: 100%;
  background-color: var(--color-beige-400);
}
</style>
