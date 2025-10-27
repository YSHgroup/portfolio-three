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
  font-size: var(--font-size-md);
  width: 128px;
  white-space: nowrap;
  text-transform: uppercase;
  z-index: 2;
  padding: var(--space-xs) var(--space-md);
}
</style>
