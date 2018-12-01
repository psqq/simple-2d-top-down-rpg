import Direction from "./direction";
import { Victor } from "./libs";

export default class DirectionalMovement {
    private moveLeft: boolean = false;
    private moveRight: boolean = false;
    private moveUp: boolean = false;
    private moveDown: boolean = false;
    private dir: Victor = new Victor(0, 0);
    isMoving() {
        return this.moveLeft || this.moveRight || this.moveDown || this.moveUp;
    }
    isMovingLeft() {
        return this.moveLeft;
    }
    isMovingRight() {
        return this.moveRight;
    }
    isMovingDown() {
        return this.moveDown;
    }
    isMovingUp() {
        return this.moveUp;
    }
    goLeft() {
        this.moveLeft = true;
    }
    goRight() {
        this.moveRight = true;
    }
    goUp() {
        this.moveUp = true;
    }
    goDown() {
        this.moveDown = true;
    }
    goDirection(d: Direction) {
        if (d === Direction.LEFT) {
            this.goLeft();
        }
        if (d === Direction.RIGHT) {
            this.goRight();
        }
        if (d === Direction.DOWN) {
            this.goDown();
        }
        if (d === Direction.UP) {
            this.goUp();
        }
    }
    stopGoLeft() {
        this.moveLeft = false;
    }
    stopGoRight() {
        this.moveRight = false;
    }
    stopGoUp() {
        this.moveUp = false;
    }
    stopGoDown() {
        this.moveDown = false;
    }
    stopGoDirection(d: Direction) {
        if (d === Direction.LEFT) {
            this.stopGoLeft();
        }
        if (d === Direction.RIGHT) {
            this.stopGoRight();
        }
        if (d === Direction.DOWN) {
            this.stopGoDown();
        }
        if (d === Direction.UP) {
            this.stopGoUp();
        }
    }
    getNormDirectionVector() {
        this.dir.x = this.dir.y = 0;
        if (this.moveLeft) {
            this.dir.x -= 1;
        }
        if (this.moveRight) {
            this.dir.x += 1;
        }
        if (this.moveUp) {
            this.dir.y -= 1;
        }
        if (this.moveDown) {
            this.dir.y += 1;
        }
        return this.dir;
    }
}
