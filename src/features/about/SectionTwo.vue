<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
</script>

<template>
  <div class="section-two">
    <div class="section-two-content grid">
      <HologramBox class="section-two-hologram-box" title="Services" footer>
        <p>- Frontend Development</p>
        <p>- Backend Development</p>
        <p>- Creative Coding</p>
        <p>- 3D Design</p>
        <p>- WebGL</p>
      </HologramBox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-two {
  color: var(--color-white-400);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  height: calc(var(--dvh) * 100);
  padding: var(--space-outer);
  opacity: 0;

  @include mixins.mq("md") {
    justify-content: center;
  }

  &-hologram-box {
    grid-column: 1 / span 12;

    @include mixins.mq("md") {
      grid-column: 2 / span 3;
    }
  }
}
</style>
