import { GameImage } from "./core/game-image";

export const HERO: GameImage = new GameImage('hero', '/assets/images/Hero.png');
export const allImages: GameImage[] = [HERO];

export async function loadAllImages() {
    await Promise.all(allImages.map(x => x.load()));
}
