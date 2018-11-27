import { Victor } from "./libs";

export default class Bounds {
    left: number;
    right: number;
    top: number;
    bottom: number;
    constructor(left: number, right: number, top: number, bottom: number) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
    static fromRect(pos: Victor, size: Victor) {
        return new Bounds(pos.x, pos.x + size.x, pos.y, pos.y + size.y);
    }
}
