import * as imageManger from './image-manager';
import * as actionManger from './action-manager';
import { Updatable, Mainloop } from './core/mainloop';
import Canvas from './core/canvas';
import { Victor } from './core/libs';
import GameCamera from './core/game-camera';
import PhysicsEngine from './core/physics-engine';
import Player from './player';
import EventManager from './core/event-manager';
import GameMap from './core/game-map';

export default class Game implements Updatable {
    mainloop: Mainloop;
    canvas: Canvas;
    gameCamera: GameCamera;
    physicsEngine: PhysicsEngine;
    player: Player;
    eventManager: EventManager;
    map1: GameMap;
    constructor() {
        this.mainloop = new Mainloop(this);
        this.canvas = new Canvas();
        this.gameCamera = new GameCamera(this.canvas);
        this.physicsEngine = new PhysicsEngine(this.mainloop);
        this.eventManager = new EventManager();
        this.player = new Player(this);
        this.map1 = new GameMap("/assets/tiled/map-1.json", this.canvas);
    }
    async load() {
        await Promise.all([
            imageManger.loadAllImages(),
            this.map1.load(),
        ]);
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
        this.player.entity.setPosition(new Victor(54 * 16 + 8, 50 * 16 - 8));
        this.gameCamera
            .init()
            .setScale(new Victor(2, 2))
            .follow(this.player.entity.getPosition());
        this.map1.makeCacheFromVisibleLayers();
        this.map1.init(this.physicsEngine.world);
        this.map1.addStaticObjectsFromObjectLayer('collision');
        return this;
    }
    update() {
        this.player.update();
        this.gameCamera.update();
        this.physicsEngine.update();
        this.draw();
        return this;
    }
    draw() {
        this.canvas.clear();
        this.gameCamera.begin();
        this.map1.drawFromCache();
        this.player.draw();
        this.gameCamera.end();
        return this;
    }
    run() {
        this.mainloop.run();
        return this;
    }
}
