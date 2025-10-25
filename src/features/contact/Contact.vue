<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";

const contactElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (contactElement.value) {
    transitions.contact.setup(contactElement.value);
  }
});

onUnmounted(() => {
  transitions.contact.destroy();
});
</script>

<template>
  <div class="contact" ref="contactElement"></div>
</template>

<style scoped lang="scss">
.contact {
  width: 100%;
  min-height: calc(var(--lvh) * 100);
  max-height: calc(var(--lvh) * 100);
}
</style>
