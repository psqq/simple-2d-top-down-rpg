import Positionable from "./positionable";
import { GameImage } from "./game-image";
import Tile from "./tile";
import { Victor } from "./libs";
import Canvas from "./canvas";
import Positioner from "./positioner";

export default class Sprite implements Positionable {
    private tile: Tile;
    private leftTopPostion: Victor = new Victor(0, 0);
    private canvas: Canvas;
    positioner: Positioner;
    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.positioner = new Positioner(this);
    }
    setImage(image: GameImage) {
        this.tile = image.toTile();
    }
    setTile(tile: Tile) {
        this.tile = tile;
    }
    getSize() {
        if (this.tile != null) {
            return this.tile.size;
        }
    }
    setLeftTopPosition(pos: Victor) {
        this.leftTopPostion.x = pos.x;
        this.leftTopPostion.y = pos.y;
    }
    draw() {
        this.canvas.context.drawImage(
            this.tile.gameImage.img,
            this.tile.positionInImage.x, this.tile.positionInImage.y,
            this.tile.size.x, this.tile.size.y,
            this.leftTopPostion.x, this.leftTopPostion.y,
            this.tile.size.x, this.tile.size.y,
        );
    }
}
