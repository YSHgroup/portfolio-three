<script setup lang="ts">
import Social from "./Social.vue";
import { useTranslationContext } from "../i18n/context";
import Link from "./Link.vue";

const { t } = useTranslationContext();
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <Social />
      <div class="footer-credits">
        <p>© {{ new Date().getFullYear() }} David Heckhoff</p>
        <p>
          {{ t("music-produced-by") }}
          <Link href="https://soundcloud.com/hmsurf" class="footer-link" external>HM Surf</Link>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-beige-400);
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
