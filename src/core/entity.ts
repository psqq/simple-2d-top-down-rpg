import { Victor, Matter } from './libs';

export default class Entity {
    positionOfCenterInWorld: Victor = new Victor(0, 0);
    size: Victor = new Victor(0, 0);
    killed: boolean = false;
    kill() {
        this.killed = true;
    }
    update() {}
    draw() {}
}
