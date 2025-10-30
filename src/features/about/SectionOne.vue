<template>
  <div class="section-one"></div>
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
      font-size: var(--font-size-lg);
      line-height: var(--line-height-copy);
      font-weight: 400;
    }
  }
}
</style>
