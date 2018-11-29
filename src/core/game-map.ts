import TiledMap, { ITilelayer } from "./tiled/tiled-map";
import Canvas from "./canvas";
import { Victor } from "./libs";

export default class GameMap extends TiledMap {
    cachedCanvas: Canvas;
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    constructor(filename: string, canvas: Canvas) {
        super(filename);
        this.canvas = canvas;
        this.ctx = this.canvas.context;
    }
    async load() {
        await this.loadAndParse();
    }
    drawTilelayer(layer: ITilelayer) {
        let pos = new Victor(0, 0);
        for (let i = 0; i < layer.data.length; i++) {
            let id = layer.data[i];
            if (id > 0) {
                let tile = this.getTileById(id);
                pos.x = layer.x + (i % layer.width);
                pos.y = layer.y + Math.floor(i / layer.width);
                pos.x *= tile.size.x;
                pos.y *= tile.size.y;
                this.canvas.drawTile(tile, pos);
            }
        }
    }
    draw() {
        for (var layer of this.map.layers) {
            if (this.isTilelayer(layer)) {
                this.drawTilelayer(layer);
            }
        }
    }
    makeCacheFromAllLayers() {
        var oldCanvas = this.canvas;
        this.cachedCanvas = new Canvas().create(this.size);
        this.canvas = this.cachedCanvas;
        this.draw();
        this.canvas = oldCanvas;
    }
    drawFromCache() {
        this.canvas.context.drawImage(
            this.cachedCanvas.canvasEl,
            0, 0
        );
    }
}
