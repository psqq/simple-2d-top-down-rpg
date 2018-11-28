import Canvas from './canvas';
import { Victor } from './libs';
import Bounds from './bounds';

export default class GameCamera {
    canvas: Canvas;
    size: Victor = new Victor(0, 0);
    positionInWorld: Victor = new Victor(0, 0);
    scale: Victor = new Victor(1, 1);
    worldBounds: Bounds;
    positionForFollow: Victor = null;
    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }
    init() {
        var onCanvasResize = () => {
            this.updateSize();
        };
        onCanvasResize();
        this.canvas.on('resize', onCanvasResize);
        return this;
    }
    changeScale(dScale: number) {
        this.scale.x += dScale;
        this.scale.y += dScale;
        this.updateSize();
        return this;
    }
    setScale(newScale: Victor) {
        this.scale.x = newScale.x;
        this.scale.y = newScale.y;
        this.updateSize();
        return this;
    }
    updateSize() {
        this.size.x = this.canvas.canvasEl.width / this.scale.x;
        this.size.y = this.canvas.canvasEl.height / this.scale.y;
    }
    applyWorldBounds() {
        if (this.worldBounds.right != null)
            this.positionInWorld.x = Math.min(this.positionInWorld.x, this.worldBounds.right - this.size.x);
        if (this.worldBounds.bottom != null)
            this.positionInWorld.y = Math.min(this.positionInWorld.y, this.worldBounds.bottom - this.size.y);
        if (this.worldBounds.left != null)
            this.positionInWorld.x = Math.max(this.positionInWorld.x, this.worldBounds.left);
        if (this.worldBounds.top != null)
            this.positionInWorld.y = Math.max(this.positionInWorld.y, this.worldBounds.top);
    }
    centerAt(pos: Victor) {
        this.positionInWorld.x = pos.x - this.size.x / 2;
        this.positionInWorld.y = pos.y - this.size.y / 2;
        if (this.worldBounds) {
            this.applyWorldBounds();
        }
    }
    follow(positionForFollow: Victor) {
        this.positionForFollow = positionForFollow;
        return this;
    }
    update() {
        if (this.positionForFollow) {
            this.centerAt(this.positionForFollow);
        }
        if (this.worldBounds != null) {
            this.applyWorldBounds();
        }
    }
    begin() {
        var ctx = this.canvas.context;
        var x = this.positionInWorld.x;
        var y = this.positionInWorld.y;
        ctx.save();
        ctx.translate(-x * this.scale.x, -y * this.scale.y);
        ctx.scale(this.scale.x, this.scale.y);
    }
    end() {
        var ctx = this.canvas.context;
        ctx.restore();
    }
}
