import type { Props as ImageTextProps } from "./components/ImageText.vue";

export interface ProjectComponents {
  imageText: ImageTextProps;
  //text: TextComponentProps;
  //list: ListProps;
}

export type ProjectComponentProps = {
  [K in keyof ProjectComponents]: {
    type: K;
    props: ProjectComponents[K];
  };
}[keyof ProjectComponents];
