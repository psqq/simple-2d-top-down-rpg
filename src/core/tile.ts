import { GameImage } from "./game-image";
import { Victor } from "./libs";

export default class Tile {
    gameImage: GameImage;
    size: Victor;
    positionInImage: Victor;
    constructor(gameImage: GameImage, tileSize: Victor, tilePosition: Victor) {
        this.gameImage = gameImage;
        this.size = tileSize;
        tilePosition.x *= this.size.x;
        tilePosition.y *= this.size.y;
        this.positionInImage = tilePosition;
    }
    static fromArray(gameImage: GameImage, sizeAndPosArr: number[]) {
        var size = new Victor(sizeAndPosArr[0], sizeAndPosArr[1]);
        var pos = new Victor(sizeAndPosArr[2], sizeAndPosArr[3]);
        return new Tile(gameImage, size, pos);
    }
}
