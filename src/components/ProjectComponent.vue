<script setup lang="ts">
export type ProjectComponentProps = {
  [K in keyof ProjectComponents]: {
    type: K;
    props: ProjectComponents[K];
  };
}[keyof ProjectComponents];

export interface ProjectComponents {
  //imageText: ImageTextComponentProps;
  //text: TextComponentProps;
  //list: ListProps;
}
</script>
