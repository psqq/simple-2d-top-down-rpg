import { Victor, Matter } from './libs';

export default class Entity {
    positionOfCenterInWorld: Victor = new Victor(0, 0);
    size: Victor = new Victor(0, 0);
    killed: boolean;
    body: Matter.Body;
    constructor() { }
    kill() {
        this.killed = true;
    }
    // /**
    //  * @param {Entity} e
    //  */
    // lenSqTo(e) {
    //     return e.position.clone().subtract(this.position).lengthSq();
    // }
    // getMinSize() {
    //     return Math.min(this.size.x, this.size.y);
    // }
    // /**
    //  * @param {Victor} pos
    //  */
    // setPosition(pos) {
    //     Body.setPosition(
    //         this.body,
    //         new Vector.create(pos.x, pos.y)
    //     );
    //     this.position.x = this.body.position.x;
    //     this.position.y = this.body.position.y;
    // }
    // kill() {
    //     this._killed = true;
    //     if (this.body) {
    //         Composite.remove(this.game.physicsEngine.world, this.body);
    //         this.body = null;
    //     }
    // }
    // /**
    //  * @param {Body} body
    //  */
    // onCollisionStart(body) { }
    // update() {
    //     if (this.body) {
    //         this.position.x = this.body.position.x;
    //         this.position.y = this.body.position.y;
    //     }
    // }
    // draw() { }
}
