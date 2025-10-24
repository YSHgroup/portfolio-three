<script setup lang="ts">
import Social from "./Social.vue";
import Link from "./Link.vue";
import Clickable from "./Clickable.vue";
import LangSwitch from "./LangSwitch.vue";
import NotchSection from "./NotchSection.vue";
import { t } from "../i18n/utils/translate";
import { locale } from "../i18n/store";
</script>

<template>
  <footer class="footer">
    <NotchSection class="footer-notch" />
    <div class="footer-content">
      <div class="footer-top">
        <Social />
        <div class="footer-top-links">
          <div class="footer-top-links-legal">
            <Clickable renderAs="div">
              <Link :href="locale === 'de' ? '/de/privacy' : '/privacy'" class="footer-link" :external="true">{{
                t("privacy")
              }}</Link>
            </Clickable>
            <Clickable renderAs="div">
              <Link :href="locale === 'de' ? '/de/legal' : '/legal'" class="footer-link" :external="true">{{
                t("legal")
              }}</Link>
            </Clickable>
          </div>
          <LangSwitch />
        </div>
      </div>
      <div class="footer-credits">
        <div class="footer-credits-music">
          <p>
            {{ t("music-produced-by") }}
          </p>
          <Clickable renderAs="div">
            <Link href="https://soundcloud.com/hmsurf" class="footer-link" external>HM Surf</Link>
          </Clickable>
        </div>
        <p>© {{ new Date().getFullYear() }} David Heckhoff</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  background: var(--color-background-300, var(--color-beige-400));
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xl);
    width: 100%;
    max-width: calc(var(--breakpoint-xxl));
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
      gap: var(--space-md);

      &-legal {
        display: flex;
        flex-direction: row;
        gap: var(--space-md);
      }

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

    &-music {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--space-xxs);
    }
  }

  &-notch {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    color: var(--color-background-300, var(--color-beige-400));
  }
}
</style>
