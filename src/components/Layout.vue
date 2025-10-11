<template>
  <div class="layout"><slot /></div>
</template>

<style scoped lang="scss">
.layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: var(--z-index-layout);
  position: relative;
}
</style>
