import Direction from "./direction";
import { Victor, EventEmitter } from "./libs";
import Entity from "./entity";

export default class TargetMovement {
    protected objToMove: Entity;
    protected target: Victor;
    constructor(objToMove: Entity) {
        this.objToMove = objToMove;
    }
    isMoving() {
        return this.target != null;
    }
    stopMoving() {
        this.target = null;
    }
    goTarget(target: Victor) {
        this.target = target;
    }
    getDistanceToTarget() {
        var p1 = this.target.clone();
        var p2 = this.objToMove.getPosition();
        var dist = p1.subtract(p2).length();
        return dist;
    }
    getNormDirectionVector() {
        if (!this.isMoving()) {
            return new Victor(0, 0);
        }
        var dir = this.target.clone().subtract(this.objToMove.getPosition()).norm();
        return dir;
    }
}
