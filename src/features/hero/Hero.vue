<script setup>
import Button from "../../components/Button.vue";
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <h1 class="hero-title">David<br />Heckhoff</h1>
          <div class="hero-subtitle">
            <div class="hero-subtitle-line"></div>
            <p class="hero-subtitle-copy">Web Developer</p>
          </div>
        </div>
        <Button class="hero-content-button">Get in touch</Button>
      </div>
    </div>
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
  overflow: hidden;

  &-content {
    &-inner {
      transform-origin: center center;
      grid-column: 2 / 13;
      gap: var(--space-xxl);
      display: flex;
      flex-direction: column;
      width: fit-content;
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    &-button {
      width: fit-content;
    }
  }

  &-title {
    font-weight: 700;
    font-size: var(--font-size-title-lg);
    letter-spacing: 1px;

    @include mixins.mq("md") {
      font-size: var(--font-size-title-xxl);
      letter-spacing: 2px;
    }
  }

  &-subtitle {
    display: flex;
    align-items: center;
    gap: var(--space-sm);

    &-line {
      width: 24px;
      height: var(--stroke-md);
      background-color: var(--color-orange-400);
    }

    &-copy {
      font-size: var(--font-size-md);
      font-weight: 500;
      color: var(--color-text-300);

      @include mixins.mq("md") {
        font-size: var(--font-size-lg);
      }
    }
  }
}
</style>
