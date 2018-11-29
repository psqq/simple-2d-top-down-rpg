import { Victor, Matter } from './libs';

export default class Entity {
    protected positionOfCenterInWorld: Victor = new Victor(0, 0);
    size: Victor = new Victor(0, 0);
    killed: boolean = false;
    kill() {
        this.killed = true;
    }
    setPosition(pos: Victor) {
        this.positionOfCenterInWorld.x = pos.x;
        this.positionOfCenterInWorld.y = pos.y;
    }
    getPosition() {
        return this.positionOfCenterInWorld;
    }
    update() {}
    draw() {}
}
