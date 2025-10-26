<template>
  <button class="header-link">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.header-link {
  letter-spacing: 0.02em;
  font-weight: 700;
  border: none;
  background: none;
  transition: color 0.125s ease-in-out;
  font-size: var(--font-size-lg);
  width: 80px;
}
</style>
