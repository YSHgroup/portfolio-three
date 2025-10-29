<script setup lang="ts">
import Layout from "../components/Layout.vue";
import Button from "../components/Button.vue";
import Link from "../components/Link.vue";
</script>

<template>
  <Layout class="not-found">
    <div class="not-found-content">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
    <Link to="/" class="not-found-button">
      <Button renderAs="div" variant="accent">Back to home</Button>
    </Link>
  </Layout>
</template>

<style scoped lang="scss">
.not-found {
  height: calc(var(--svh) * 100);
  padding: var(--space-outer);

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-lg);
    height: 100%;
    flex: 1;
  }

  &-button {
    width: 100%;
    max-width: calc(var(--breakpoint-sm) - 1px);
  }
}
</style>
