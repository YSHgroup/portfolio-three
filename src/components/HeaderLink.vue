<template>
  <button class="header-link">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.header-link {
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  border: none;
  background: none;
}
</style>
