import * as imageManger from './image-manager';
import * as animationManger from './animation-manager';
import { Updatable, Mainloop } from './core/mainloop';
import Canvas from './core/canvas';
import { GameAnimation } from './core/game-animation';
import { Victor } from './core/libs';
import GameCamera from './core/game-camera';


export default class Game implements Updatable {
    mainloop: Mainloop;
    canvas: Canvas;
    heroAnimation: GameAnimation;
    pos: Victor = new Victor(0, 0);
    gameCamera: GameCamera;
    constructor() {
        this.mainloop = new Mainloop(this);
        this.canvas = new Canvas();
        this.gameCamera = new GameCamera(this.canvas);
    }
    async load() {
        await imageManger.loadAllImages();
        return this;
    }
    init() {
        this.canvas
            .create()
            .appendTo('body')
            .alwaysFullscreen();
        this.gameCamera
            .init()
            .follow(this.pos);
        this.heroAnimation = animationManger.HERO_WALK_UP.getAnimation(this.mainloop);
        return this;
    }
    update() {
        this.gameCamera.update();
        this.heroAnimation.update();
        this.draw();
        return this;
    }
    draw() {
        this.canvas.clear();
        this.gameCamera.begin();
        var tile = this.heroAnimation.getCurrentTile();
        this.canvas.drawTileByCenter(tile, this.pos);
        this.gameCamera.end();
        return this;
    }
    run() {
        this.mainloop.run();
        return this;
    }
}
