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
  <div class="contact" ref="contactElement">contact</div>
</template>

<style scoped lang="scss">
.contact {
  min-height: var(--100vh);
}
</style>
