import { Mainloop } from "./mainloop";
import { Matter } from './libs';

const ARCADE_BODY_SETTINGS = {
    density: 1,
    friction: 0,
    restitution: 1,
    inertia: Infinity,
    isStatic: false,
};

export default class PhysicsEngine {
    mainloop: Mainloop;
    world: Matter.World;
    engine: Matter.Engine;
    constructor(mainloop: Mainloop) {
        this.mainloop = mainloop;
    }
    create() {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        return this;
    }
    noGravity() {
        this.world.gravity.y = 0;
        this.world.gravity.x = 0;
    }
    static getArcadeBodySettings() {
        return Object.assign({}, ARCADE_BODY_SETTINGS);
    }
    update() {
        Matter.Engine.update(this.engine, this.mainloop.dt);
    }
}
