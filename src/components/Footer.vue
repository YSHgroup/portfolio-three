<script setup lang="ts">
import Social from "./Social.vue";
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <Social />
      <div class="footer-credits">
        <p>© {{ new Date().getFullYear() }} David Heckhoff</p>
        <p>
          Music produced by
          <a href="/legal" target="_blank" class="footer-link" rel="noopener noreferrer">HM Surf</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--background-beige);
  width: 100%;
  display: flex;
  justify-content: center;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-lg);
    width: 100%;
    max-width: var(--breakpoint-xxl);
    padding: calc(var(--space-outer) + var(--space-sm)) var(--space-outer);
  }

  &-link {
    text-decoration: underline;
  }

  &-credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    font-size: var(--font-size-sm);

    @include mixins.mq("md") {
      gap: var(--space-md);
      flex-direction: row;
      justify-content: space-between;
      font-size: var(--font-size-md);
    }
  }
}
</style>
