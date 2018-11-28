import { Victor, Matter } from './libs';
import Entity from './entity';

export default class PhysicalEntity extends Entity {
    body: Matter.Body;
    bodyContainer: Matter.Composite;
    constructor(bodyContainer: Matter.Composite) {
        super();
        this.bodyContainer = bodyContainer;
    }
    kill() {
        super.kill();
        if (this.body != null) {
            Matter.World.remove(this.bodyContainer, this.body);
        }
    }
    syncWithBodyPosition() {
        this.positionOfCenterInWorld.x = this.body.position.x;
        this.positionOfCenterInWorld.y = this.body.position.y;
    }
    update() {}
    draw() {}
}
