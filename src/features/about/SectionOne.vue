<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
</script>

<template>
  <div class="section-one">
    <div class="section-one-content grid">
      <div class="section-one-content-inner" id="section-one-content">
        <HologramBox class="section-one-hologram-box" title="About">
          <p>Name: David</p>
          <p>Location: Germany</p>
        </HologramBox>
        <HologramBox class="section-one-hologram-box" footer>
          <p class="section-one-hologram-box-copy">
            David focuses on modern web technologies that bridge visuals and performance.
            <br />With expertise in WebGL, TypeScript, and Node.js, he builds scalable systems and real-time 3D
            interfaces for the web.
          </p>
        </HologramBox>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-one {
  color: var(--color-white-400);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  padding: var(--space-outer);

  @include mixins.mq("md") {
    height: calc(var(--svh) * 100);
    justify-content: center;
  }

  &-content {
    &-inner {
      grid-column: 1 / span 12;

      @include mixins.mq("md") {
        grid-column: 9 / span 3;
      }

      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }
  }

  &-hologram-box {
    &-copy {
      font-size: var(--font-size-md);
      font-weight: 500;
    }
  }
}
</style>
