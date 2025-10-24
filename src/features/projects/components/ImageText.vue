<script setup lang="ts">
export interface Props {
  imagePosition: "left" | "right";
  src: string;
  alt?: string;
  text: string;
}

const props = defineProps<Props>();
</script>
