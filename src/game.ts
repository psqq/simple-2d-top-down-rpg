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
import EntitiesManager from './core/entities-manager';
import DoorEnity from './entities/door-entity';

export default class Game implements Updatable {
    mainloop: Mainloop;
    canvas: Canvas;
    gameCamera: GameCamera;
    physicsEngine: PhysicsEngine;
    player: Player;
    eventManager: EventManager;
    entitiesManager: EntitiesManager;
    map1: GameMap;
    constructor() {
        this.mainloop = new Mainloop(this);
        this.canvas = new Canvas();
        this.gameCamera = new GameCamera(this.canvas);
        this.physicsEngine = new PhysicsEngine(this.mainloop);
        this.eventManager = new EventManager();
        this.entitiesManager = new EntitiesManager(this.gameCamera);
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
        actionManger.init(this);
        this.canvas
            .create()
            .appendTo('body')
            .alwaysFullscreen();
        this.physicsEngine
            .create()
            .noGravity();
        this.eventManager
            .init()
            .noContextMenu();
        this.gameCamera
            .init()
            .setScale(new Victor(2, 2));
        this.map1
            .setBodiesContainer(this.physicsEngine.world)
            .setGameCamera(this.gameCamera);
        this.map1.makeCacheFromVisibleLayers();
        this.map1.addStaticObjectsFromObjectLayer('collision');
        var entitiesLayer = this.map1.getObjectLayer('entities');
        var pos = new Victor(0, 0);
        for (var obj of entitiesLayer.objects) {
            pos.x = obj.x + obj.width / 2;
            pos.y = obj.y + obj.height / 2;
            if (obj.name === 'door') {
                var door = new DoorEnity(this);
                door.init();
                door.setPosition(pos);
                this.entitiesManager.addEntity(door);
            }
        }
        this.player.init();
        this.gameCamera.follow(this.player.entity.getPosition());
        return this;
    }
    update() {
        this.entitiesManager.update();
        this.gameCamera.update();
        this.physicsEngine.update();
        this.draw();
        return this;
    }
    draw() {
        this.canvas.clear();
        this.gameCamera.begin();
        this.map1.drawFromCache();
        this.entitiesManager.draw();
        this.gameCamera.end();
        return this;
    }
    run() {
        this.mainloop.run();
        return this;
    }
}
