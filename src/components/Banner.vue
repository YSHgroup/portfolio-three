<template>
  <div class="banner">
    <p class="banner-copy"><slot></slot></p>
  </div>
</template>

<style scoped lang="scss">
.banner {
  background-color: #25365d;
  width: fit-content;
  outline: var(--stroke-md) solid var(--color-beige-400);
  padding: var(--space-xxs) var(--space-xs);

  @include mixins.mq("md") {
    outline-width: var(--stroke-lg);
  }

  @include mixins.mq("lg") {
    padding: var(--space-xs) var(--space-sm);
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
</style>
