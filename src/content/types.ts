import type { TagVariant } from "../components/Tag.vue";
import type { ProjectComponents } from "../components/ProjectComponent.vue";

export interface ProjectContent {
  title: string;
  slug: string;
  description?: string;
  //thumbnail: ImageMetadata;
  video: string;
  live?: string;
  source?: string;
  components?: ProjectComponents[];
}

export type ProjectComponent = {
  [K in keyof ProjectComponents]: {
    type: K;
    props: ProjectComponents[K];
  };
}[keyof ProjectComponents];

export interface SkillContent {
  name: string;
  bullets: string[];
}

export interface ProjectPreview {
  title: string;
  thumbnail: string;
  slug: string;
  description: string;
  tags: TagVariant[];
}
