<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
</script>

<template>
  <div class="section-two">
    <div class="section-two-content grid">
      <div id="section-two-content" class="section-two-content-inner">
        <HologramBox id="section-two-content" class="section-two-hologram-box" title="Services" footer>
          <p>- Frontend Development</p>
          <p>- Backend Development</p>
          <p>- Creative Coding</p>
          <p>- 3D Design</p>
          <p>- WebGL</p>
        </HologramBox>
      </div>
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
  height: calc(var(--svh) * 100);
  padding: var(--space-outer);

  @include mixins.mq("md") {
    justify-content: center;
  }

  &-content {
    &-inner {
      width: 100%;
      grid-column: 1 / span 12;

      @include mixins.mq("md") {
        grid-column: 2 / span 3;
      }
    }
  }

  &-hologram-box {
    grid-column: 1 / span 12;

    @include mixins.mq("md") {
      grid-column: 2 / span 3;
    }
  }
}
</style>
