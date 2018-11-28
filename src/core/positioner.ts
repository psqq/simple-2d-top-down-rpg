import Positionable from './positionable';
import { Victor } from './libs';

export default class Positioner {
    private positionableObject: Positionable;
    private leftTopPosition: Victor = new Victor(0, 0);
    private size: Victor;
    constructor(positionableObject: Positionable) {
        this.positionableObject = positionableObject;
    }
    left(value: number) {
        this.leftTopPosition.x = value;
        return this;
    }
    right(value: number) {
        this.leftTopPosition.x = value - this.positionableObject.getSize().x;
        return this;
    }
    top(value: number) {
        this.leftTopPosition.y = value;
        return this;
    }
    bottom(value: number) {
        this.leftTopPosition.y = value - this.positionableObject.getSize().y;
        return this;
    }
    centerX(value: number) {
        this.leftTopPosition.x = value - this.positionableObject.getSize().x / 2;
        return this;
    }
    centerY(value: number) {
        this.leftTopPosition.y = value - this.positionableObject.getSize().y / 2;
        return this;
    }
    center(value: Victor) {
        this.leftTopPosition.x = value.x - this.positionableObject.getSize().x / 2;
        this.leftTopPosition.y = value.y - this.positionableObject.getSize().y / 2;
        return this;
    }
    setLeftTopPosition() {
        this.positionableObject.setLeftTopPosition(this.leftTopPosition);
        return this;
    }
}
