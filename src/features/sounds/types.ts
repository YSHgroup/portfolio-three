import { musicTracks } from "./definitions/music";
import { sounds } from "./definitions/sounds";
import { sprites } from "./definitions/sprites";

export type MusicTrack = keyof typeof musicTracks;
export type SoundKey = keyof typeof sounds;
export type SpriteKey = keyof typeof sprites;

type SoundDataHowl = { howl: Howl; unique?: boolean };
type SoundDataSprite = { spriteKey: SpriteKey; name: string; unique?: boolean };

export type SoundsData = Record<string, SoundDataHowl | SoundDataSprite>;

export type SpritesData = Record<string, { howl: Howl }>;
