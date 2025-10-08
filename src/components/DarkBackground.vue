<template>
  <div class="dark-background"></div>
</template>

<style scoped lang="scss">
.dark-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background-dark);
  z-index: var(--z-index-background);
  opacity: 0;
}
</style>
