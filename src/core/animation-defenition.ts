import { GameImage } from './game-image';
import { Victor } from './libs';
import { Mainloop } from './mainloop';
import { GameAnimation } from './game-animation';
import Tile from './tile';

export default class AnimationDefenition {
    gameImage: GameImage;
    tiles: Tile[];
    constructor(gameImage: GameImage, tiles: Tile[]) {
        this.gameImage = gameImage;
        this.tiles = tiles;
    }
    getAnimation(mainloop: Mainloop) {
        return new GameAnimation(this, mainloop);
    }
    static fromArrays(gameImage: GameImage, tilesizeArr: number[], tilesArr: number[]) {
        var tiles: Tile[] = [];
        var size = Victor.fromArray(tilesizeArr);
        for (var i = 0; i < tilesArr.length; i += 2) {
            var sPos = new Victor(tilesArr[i], tilesArr[i + 1]);
            tiles.push(new Tile(gameImage, size, sPos));
        }
        return new AnimationDefenition(
            gameImage,
            tiles
        );
    }
}
