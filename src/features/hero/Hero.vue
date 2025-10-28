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
      width: 100%;
      position: relative;

      @include mixins.mq("md") {
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
    font-size: var(--font-size-title-lg);
    font-size: 72px;
    letter-spacing: 0.02em;

    @include mixins.mq("md") {
      font-size: var(--font-size-title-xxl);
    }

    @include mixins.mq("lg") {
      font-size: var(--font-size-title-xxxl);
    }
  }

  &-subtitle {
    background-color: #2a395a;
    width: fit-content;
    position: absolute;
    bottom: 0;
    right: 50%;
    transform: rotate(-7deg) translate(90%, 100%);
    outline: var(--stroke-md) solid var(--color-beige-400);
    z-index: 10;
    padding: var(--space-xxs) var(--space-xs);

    @include mixins.mq("md") {
      padding: var(--space-xs) var(--space-sm);
      outline-width: var(--stroke-lg);
      right: 0;
      transform: rotate(-7deg) translate(32px, 60%);
    }

    &-copy {
      font-size: var(--font-size-title-xxs);
      font-weight: 700;
      color: var(--color-white-400);
      font-family: "NB-Architekt-Std";

      @include mixins.mq("md") {
        font-size: var(--font-size-title-xs);
      }

      @include mixins.mq("lg") {
        font-size: var(--font-size-title-sm);
      }
    }
  }
}
</style>
