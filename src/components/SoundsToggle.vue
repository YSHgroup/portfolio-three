<script setup lang="ts">
import { soundsEnabled } from "../features/sounds/composables/useHowler";
import ButtonRound from "./ButtonRound.vue";
import Volume from "./icons/Volume.vue";
import { t } from "../i18n/utils/translate";

const props = defineProps<{
  isDarkTheme: boolean;
}>();

const toggleSounds = () => {
  soundsEnabled.value = !soundsEnabled.value;
};
</script>

<template>
  <ButtonRound
    variant="theme"
    :class="{ 'music-toggle': true, 'music-toggle-dark': props.isDarkTheme }"
    @click="toggleSounds"
    :aria-label="soundsEnabled ? t('disable-sounds') : t('enable-sounds')"
    data-cursor="circle-white"
  >
    <Volume :active="soundsEnabled" />
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
