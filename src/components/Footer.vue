<script setup lang="ts">
import Social from "./Social.vue";
import { useTranslationContext } from "../i18n/context";
import Link from "./Link.vue";
import Clickable from "./Clickable.vue";
import LangSwitch from "./LangSwitch.vue";

const { t, locale } = useTranslationContext();
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-top">
        <Social />
        <div class="footer-top-links">
          <Clickable renderAs="div">
            <Link :href="locale === 'de' ? '/de/privacy' : '/privacy'" class="footer-link" external>{{
              t("privacy")
            }}</Link>
          </Clickable>
          <Clickable renderAs="div">
            <Link :href="locale === 'de' ? '/de/legal' : '/legal'" class="footer-link" external>{{ t("legal") }}</Link>
          </Clickable>
          <LangSwitch />
        </div>
      </div>
      <div class="footer-credits">
        <p>
          {{ t("music-produced-by") }}
          <Clickable>
            <Link href="https://soundcloud.com/hmsurf" class="footer-link" external>HM Surf</Link>
          </Clickable>
        </p>
        <p>© {{ new Date().getFullYear() }} David Heckhoff</p>
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
    gap: var(--space-xl);
    width: 100%;
    max-width: var(--breakpoint-xxl);
    padding: calc(var(--space-outer) + var(--space-sm)) var(--space-outer);
  }

  &-top {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-xl);

    @include mixins.mq("md") {
      gap: var(--space-md);
      flex-direction: row;
    }

    &-links {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: var(--space-sm);

      @include mixins.mq("md") {
        gap: var(--space-lg);
        flex-direction: row;
      }
    }
  }

  &-link {
    font-weight: 700;
  }

  &-credits {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    width: 100%;
    font-size: var(--font-size-sm);
  }
}
</style>
