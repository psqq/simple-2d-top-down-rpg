import * as imageManger from './image-manager';
import * as actionManger from './action-manager';
import { Updatable, Mainloop } from './core/mainloop';
import Canvas from './core/canvas';
import { Victor } from './core/libs';
import GameCamera from './core/game-camera';
import PhysicsEngine from './core/physics-engine';
import Player from './player';
import EventManager from './core/event-manager';

export default class Game implements Updatable {
    mainloop: Mainloop;
    canvas: Canvas;
    gameCamera: GameCamera;
    physicsEngine: PhysicsEngine;
    player: Player;
    eventManager: EventManager;
    constructor() {
        this.mainloop = new Mainloop(this);
        this.canvas = new Canvas();
        this.gameCamera = new GameCamera(this.canvas);
        this.physicsEngine = new PhysicsEngine(this.mainloop);
        this.eventManager = new EventManager();
        this.player = new Player(this);
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
        this.physicsEngine
            .create()
            .noGravity();
        actionManger.init(this);
        this.eventManager
            .init()
            .noContextMenu();
        this.player
            .init();
        this.gameCamera
            .init()
            .setScale(new Victor(2, 2))
            .follow(this.player.entity.positionOfCenterInWorld);
        return this;
    }
    update() {
        this.gameCamera.update();
        this.player.update();
        this.draw();
        return this;
    }
    draw() {
        this.canvas.clear();
        this.gameCamera.begin();
        this.player.draw();
        this.gameCamera.end();
        return this;
    }
    run() {
        this.mainloop.run();
        return this;
    }
}
