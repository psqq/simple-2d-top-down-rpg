import { Victor, Matter } from './libs';

export default class Entity {
    protected positionOfCenterInWorld: Victor = new Victor(0, 0);
    size: Victor = new Victor(0, 0);
    killed: boolean = false;
    zindex: number = 0;
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
    getLeftTopPosition() {
        var v = new Victor(0, 0);
        v.x = this.positionOfCenterInWorld.x - this.size.x / 2;
        v.y = this.positionOfCenterInWorld.y - this.size.y / 2;
        return v;
    }
    update() { }
    draw() { }
}
