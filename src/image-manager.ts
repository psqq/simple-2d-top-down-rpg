import { GameImage } from "./core/game-image";
import Tile from "./core/tile";

export const HERO: GameImage = new GameImage('/assets/images/Hero.png', 'hero');
export const allImages: GameImage[] = [HERO];

export const HERO_IDLE_DOWN = Tile.fromArray(HERO, [16, 16, 4, 0]);

export async function loadAllImages() {
    await Promise.all(allImages.map(x => x.load()));
}
