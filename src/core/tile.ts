import { GameImage } from "./game-image";
import { Victor } from "./libs";

export default class Tile {
    gameImage: GameImage;
    size: Victor;
    positionInImage: Victor;
    constructor(gameImage: GameImage, tileSize: Victor, tilePosition: Victor) {
        this.gameImage = gameImage;
        this.size = tileSize;
        this.positionInImage = tilePosition;
    }
}
