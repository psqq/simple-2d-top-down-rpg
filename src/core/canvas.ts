import { GameImage } from './game-image';
import { Victor, EventEmitter } from './libs';
import Tile from './tile';

export default class Canvas extends EventEmitter {
    canvasEl: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    create() {
        this.canvasEl = document.createElement('canvas');
        this.context = this.canvasEl.getContext('2d');
        return this;
    }
    appendTo(rootElSelector: string) {
        document.querySelector(rootElSelector).appendChild(this.canvasEl);
        return this;
    }
    private setFullscreenSize() {
        this.canvasEl.width = window.innerWidth;
        this.canvasEl.height = window.innerHeight;
    }
    private setFullscreenStyles() {
        this.canvasEl.style.position = 'fixed';
        this.canvasEl.style.top = '0px';
        this.canvasEl.style.left = '0px';
    }
    alwaysFullscreen() {
        this.setFullscreenStyles();
        this.setFullscreenSize();
        var onResize = () => {
            this.setFullscreenSize();
            this.emit('resize');
        };
        window.addEventListener('resize', onResize);
        return this;
    }
    clear() {
        var w = this.canvasEl.width;
        var h = this.canvasEl.height;
        this.context.clearRect(0, 0, w, h);
        return this;
    }
    drawGameImage(gameImage: GameImage, leftTopPos: Victor) {
        var dx = leftTopPos.x;
        var dy = leftTopPos.y;
        this.context.drawImage(gameImage.img, dx, dy);
    }
    drawTile(tile: Tile, leftTopPos: Victor) {
        var dx = leftTopPos.x;
        var dy = leftTopPos.y;
        var { x: w, y: h } = tile.size;
        var { x: sx, y: sy } = tile.positionInImage;
        this.context.drawImage(
            tile.gameImage.img,
            sx, sy, w, h,
            dx, dy, w, h
        );
    }
    drawGameImageByCenter(gameImage: GameImage, centerPos: Victor) {
        var x = centerPos.x;
        var y = centerPos.y;
        var w = gameImage.img.width;
        var h = gameImage.img.height;
        var left = x - w / 2;
        var top = y - h / 2;
        this.context.drawImage(gameImage.img, left, top);
    }
    drawTileByCenter(tile: Tile, centerPos: Victor) {
        var x = centerPos.x;
        var y = centerPos.y;
        var { x: w, y: h } = tile.size;
        var dx = x - w / 2;
        var dy = y - h / 2;
        var { x: sx, y: sy } = tile.positionInImage;
        this.context.drawImage(
            tile.gameImage.img,
            sx, sy, w, h,
            dx, dy, w, h
        );
    }
}
