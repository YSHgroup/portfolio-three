<script setup>
import Button from "../../components/Button.vue";
import Banner from "../../components/Banner.vue";
import { t } from "../../i18n/utils/translate";
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <h1 class="hero-title">David<br />Heckhoff</h1>
          <Banner class="hero-banner">{{ t("job-title") }}</Banner>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-content {
    align-items: center;
    justify-content: center;
    height: 50%;

    @include mixins.mq("md") {
      padding-bottom: 30%;
      height: 100%;
    }

    @include mixins.mq("lg") {
      padding-bottom: 5%;
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-xxl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.mq("md") {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
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
    font-weight: 900;
    font-size: 72px;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-lg);

    @include mixins.mq("sm") {
      font-size: var(--font-size-title-xl);
    }

    @include mixins.mq("xl") {
      font-size: var(--font-size-title-xxl);
    }
  }

  &-banner {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 10;
    transform: rotate(-3deg) translate(8px, 75%);

    @include mixins.mq("sm") {
      transform: rotate(-3deg) translate(0, 60%);
    }

    @include mixins.mq("lg") {
      outline-width: var(--stroke-lg);
      right: -16px;
      transform: rotate(-4deg) translate(0, 70%);
    }
  }
}
</style>
