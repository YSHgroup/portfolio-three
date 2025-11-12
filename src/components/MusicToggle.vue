<script setup lang="ts">
import { musicEnabled } from "../features/music/composables/useMusic";
import ButtonRound from "./ButtonRound.vue";
import Volume from "./icons/Volume.vue";
import { t } from "../i18n/utils/translate";

const props = defineProps<{
  isDarkTheme: boolean;
}>();

const toggleMusic = () => {
  musicEnabled.value = !musicEnabled.value;
};
</script>

<template>
  <ButtonRound
    variant="theme"
    :class="{ 'music-toggle': true, 'music-toggle-dark': props.isDarkTheme }"
    @click="toggleMusic"
    :aria-label="musicEnabled ? t('disable-music') : t('enable-music')"
    data-cursor="circle-white"
  >
    <Volume :active="musicEnabled" />
  </ButtonRound>
</template>

<style scoped lang="scss">
.music-toggle {
  &-dark {
    background-color: var(--color-dark-blue-500);
    color: var(--color-white-400);
  }
}
</style>
