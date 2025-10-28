<script setup>
import Button from "../../components/Button.vue";
import { t } from "../../i18n/utils/translate";
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <h1 class="hero-title">David<br />Heckhoff</h1>
          <div class="hero-subtitle">
            <p class="hero-subtitle-copy">{{ t("job-title") }}</p>
          </div>
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

  &-subtitle {
    background-color: #2a395a;
    width: fit-content;
    position: absolute;
    bottom: 0;
    right: 0;
    outline: var(--stroke-md) solid var(--color-beige-400);
    z-index: 10;
    padding: var(--space-xxs) var(--space-xs);
    transform: rotate(-4deg) translate(8px, 75%);

    @include mixins.mq("sm") {
      transform: rotate(-4deg) translate(0, 60%);
    }

    @include mixins.mq("lg") {
      padding: var(--space-xs) var(--space-sm);
      outline-width: var(--stroke-lg);
      right: -16px;
      transform: rotate(-5deg) translate(0, 70%);
    }

    &-copy {
      font-size: var(--font-size-title-xxs);
      font-weight: 700;
      color: var(--color-white-400);
      font-family: "NB-Architekt-Std";

      @include mixins.mq("lg") {
        font-size: var(--font-size-title-xs);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-sm);
      }
    }
  }
}
</style>
