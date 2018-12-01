import { GameImage } from "./core/game-image";
import Tile from "./core/tile";

export const HERO: GameImage
    = new GameImage('/assets/images/Hero.png', 'hero');
export const TINY_BASIC_THINGS: GameImage
    = new GameImage('/assets/images/Tiny 16: Basic/things.png', 'things');
export const allImages: GameImage[] = [HERO, TINY_BASIC_THINGS];

export const HERO_IDLE_UP = Tile.fromArray(HERO, [16, 16, 0, 0]);
export const HERO_IDLE_DOWN = Tile.fromArray(HERO, [16, 16, 4, 0]);
export const HERO_IDLE_LEFT = Tile.fromArray(HERO, [16, 16, 0, 1]);
export const HERO_IDLE_RIGHT = Tile.fromArray(HERO, [16, 16, 4, 1]);

export const CLOSED_DOOR = Tile.fromArray(TINY_BASIC_THINGS, [16, 16, 0, 0]);

export async function loadAllImages() {
    await Promise.all(allImages.map(x => x.load()));
}
