import type { Props as ImageTextProps } from "./components/ImageText.vue";
import type { Props as TextProps } from "./components/Text.vue";
import type { Props as ListProps } from "./components/List.vue";
import type { Props as ImageProps } from "./components/Image.vue";
import type { Props as VideoProps } from "./components/Video.vue";

export interface ProjectComponents {
  imageText: ImageTextProps;
  text: TextProps;
  list: ListProps;
  image: ImageProps;
  video: VideoProps;
}

export type ProjectComponent = {
  [K in keyof ProjectComponents]: {
    type: K;
    props: ProjectComponents[K];
  };
}[keyof ProjectComponents];

type ProjectComponentMap<K extends keyof ProjectComponents> = {
  type: K;
  props: ProjectComponents[K];
};

export type ProjectComponentProps = ProjectComponentMap<keyof ProjectComponents>;
