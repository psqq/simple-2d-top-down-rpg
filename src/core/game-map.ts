import TiledMap, { ITilelayer } from "./tiled/tiled-map";
import Canvas from "./canvas";
import { Victor, Matter } from "./libs";
import PhysicalEntity from "./physical-entity";
import PhysicsEngine from "./physics-engine";

export default class GameMap extends TiledMap {
    cachedCanvas: Canvas;
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    bodiesContainer: Matter.Composite;
    constructor(filename: string, canvas: Canvas) {
        super(filename);
        this.canvas = canvas;
        this.ctx = this.canvas.context;
    }
    async load() {
        await this.loadAndParse();
    }
    init(bodiesContainer: Matter.Composite) {
        this.bodiesContainer = bodiesContainer;
    }
    addStaticObjectsFromObjectLayer(layerName: string) {
        var layer = this.getObjectLayer(layerName);
        for (var obj of layer.objects) {
            var cx = obj.x + obj.width / 2;
            var cy = obj.y + obj.height / 2;
            var settings = PhysicsEngine.getArcadeBodySettings();
            settings.isStatic = true;
            Matter.Composite.add(
                this.bodiesContainer,
                Matter.Bodies.rectangle(
                    cx, cy,
                    obj.width, obj.height,
                    settings
                )
            );
        }
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
    makeCacheFromVisibleLayers() {
        var oldCanvas = this.canvas;
        this.cachedCanvas = new Canvas().create(this.size);
        this.canvas = this.cachedCanvas;
        for (var layer of this.map.layers) {
            if (this.isTilelayer(layer)) {
                if (layer.visible) {
                    this.drawTilelayer(layer);
                }
            }
        }
        this.canvas = oldCanvas;
    }
    drawFromCache() {
        this.canvas.context.drawImage(
            this.cachedCanvas.canvasEl,
            0, 0
        );
    }
}
