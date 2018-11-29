import { loadImage, getuid } from "./utils";
import { Victor } from "./libs";
import Tile from "./tile";

export class GameImage {
    name: string;
    img: HTMLImageElement;
    src: string;
    size: Victor = new Victor(0, 0);
    tile: Tile;
    constructor(src, name = null) {
        this.src = src;
        if (name == null) {
            name = "" + getuid();
        }
        this.name = name;
        this.tile = new Tile(this, this.size, new Victor(0, 0));
    }
    async load() {
        this.img = await loadImage(this.src);
        this.size.x = this.img.width;
        this.size.y = this.img.height;
        return this;
    }
    toTile() {
        return this.tile;
    }
    static fromImage(img: HTMLImageElement): GameImage {
        var gameImage = new GameImage(img.src);
        gameImage.size.x = img.width;
        gameImage.size.y = img.height;
        gameImage.img = img;
        return gameImage;
    }
}
