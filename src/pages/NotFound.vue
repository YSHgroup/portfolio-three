<script setup lang="ts">
import Layout from "../components/Layout.vue";
import LayoutContent from "../components/LayoutContent.vue";
import Button from "../components/Button.vue";
import Link from "../components/Link.vue";
</script>

<template>
  <Layout class="not-found">
    <LayoutContent size="md">
      <div class="not-found-content">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
      <Link to="/">
        <Button renderAs="div">Back to home</Button>
      </Link>
    </LayoutContent>
  </Layout>
</template>

<style scoped lang="scss">
.not-found {
  height: var(--100vh);
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
}
</style>
