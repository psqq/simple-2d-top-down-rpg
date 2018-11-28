import { Mainloop } from "./mainloop";
import { Matter } from './libs';

const arcadeBodySettings = {
    density: 1,
    friction: 0,
    restitution: 1,
    inertia: Infinity,
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
    getArcadeBodySettings() {
        return Object.assign({}, arcadeBodySettings);
    }
    update() {
        Matter.Engine.update(this.engine, this.mainloop.dt);
    }
}
