import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import EventEmitter from "./EventEmitter";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { sources } from "../sources";

import type { Texture } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const isProd = import.meta.env.PROD;

type ResourceType = Texture | GLTF;

class Resources extends EventEmitter<{
  ready: void;
}> {
  toLoad = sources.length;
  loaded = 0;
  items: Record<string, any> = {};

  loaders = {
    gltfLoader: new GLTFLoader(),
    textureLoader: new TextureLoader(),
    fontLoader: new FontLoader(),
  };

  startLoading() {
    for (const source of sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file: Texture) => {
          this.sourceLoaded(source, file);
          file.colorSpace = SRGBColorSpace;
        });
      }
    }
  }

  sourceLoaded(source: { name: string; type: string; path: string }, file: ResourceType) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.emit("ready");
      this.log("All resources loaded");
    }
  }

  log(message: string) {
    if (isProd) return;
    console.log(`[Resources] ${message}`);
  }
}

export const resources = new Resources();
