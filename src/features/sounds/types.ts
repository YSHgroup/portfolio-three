import { musicTracks } from "./definitions/music";
import { sounds } from "./definitions/sounds";

export type MusicTrack = keyof typeof musicTracks;
export type SoundKey = keyof typeof sounds;