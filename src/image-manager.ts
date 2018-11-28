import { GameImage } from "./core/game-image";
import Tile from "./core/tile";

export const HERO: GameImage = new GameImage('/assets/images/Hero.png', 'hero');
export const allImages: GameImage[] = [HERO];

export const HERO_IDLE_UP = Tile.fromArray(HERO, [16, 16, 0, 0]);
export const HERO_IDLE_DOWN = Tile.fromArray(HERO, [16, 16, 4, 0]);
export const HERO_IDLE_LEFT = Tile.fromArray(HERO, [16, 16, 0, 1]);
export const HERO_IDLE_RIGHT = Tile.fromArray(HERO, [16, 16, 4, 1]);

export async function loadAllImages() {
    await Promise.all(allImages.map(x => x.load()));
}
