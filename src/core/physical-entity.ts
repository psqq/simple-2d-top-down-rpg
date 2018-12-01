import { Victor, Matter } from './libs';
import Entity from './entity';

export default class PhysicalEntity extends Entity {
    body: Matter.Body;
    bodyContainer: Matter.Composite;
    constructor() {
        super();
    }
    init(bodyContainer: Matter.Composite) {
        this.bodyContainer = bodyContainer;
    }
    setPosition(pos: Victor) {
        super.setPosition(pos);
        Matter.Body.setPosition(
            this.body,
            Matter.Vector.create(pos.x, pos.y)
        );
    }
    createCircleBody(r: number, settings: Matter.IBodyDefinition = {}) {
        this.size.x = r + r;
        this.size.y = r + r;
        this.body = Matter.Bodies.circle(
            this.positionOfCenterInWorld.x,
            this.positionOfCenterInWorld.y,
            r,
            settings
        );
        Matter.Composite.add(this.bodyContainer, this.body);
    }
    createRectangleBody(size: Victor, settings: Matter.IBodyDefinition = {}) {
        this.size = size;
        this.body = Matter.Bodies.rectangle(
            this.positionOfCenterInWorld.x,
            this.positionOfCenterInWorld.y,
            size.x, size.y,
            settings
        );
        Matter.Composite.add(this.bodyContainer, this.body);
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
    update() {
        if (this.body) {
            this.syncWithBodyPosition();
        }
    }
    draw() { }
}
