import AnimationDefenition from "./animation-defenition";
import { Mainloop } from "./mainloop";
import Tile from "./tile";
import { EventEmitter } from './libs';

export class GameAnimation extends EventEmitter {
    private animationDef: AnimationDefenition;
    private duration: number = 1000;
    private mainloop: Mainloop;
    private done: boolean;
    private frame: number = 0;
    private frameTime: number = 0;
    private frameRate: number = 0;
    private _loop: boolean = true;
    constructor(animationDef: AnimationDefenition, mainloop: Mainloop) {
        super();
        this.animationDef = animationDef;
        this.mainloop = mainloop;
        this.frameRate = this.duration / this.animationDef.tiles.length;
        this.done = false;
    }
    loop(value: boolean = true) {
        this._loop = true;
        return this;
    }
    getCurrentTile(): Tile {
        return this.animationDef.tiles[this.frame];
    }
    playFromBeginning() {
        this.frame = 0;
        this.done = false;
        return this;
    }
    update() {
        if (this.done)
            return;
        var dt = this.mainloop.dt;
        this.frameTime += dt;
        if (this.frameTime > this.frameRate) {
            this.frame = this.frame + 1;
            this.frameTime = 0;
            if (this.frame === this.animationDef.tiles.length) {
                this.frame = 0;
                if (!this._loop) {
                    this.done = true;
                    this.emit('done');
                }
            }
        }
    }
}
