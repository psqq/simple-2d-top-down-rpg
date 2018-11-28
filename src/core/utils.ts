import { Victor } from "./libs";
import Direction from "./direction";

var id = 0;

export function loadImage(filename: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = err => reject(err);
        img.src = filename;
    });
}

export function directionVectorToDirection(v: Victor): Direction {
    if (v.length() === 0)
        return Direction.NONE;
    v.norm();
    if (Math.abs(v.y) > Math.abs(v.x)) {
        if (v.y < 0)
            return Direction.UP;
        else
            return Direction.DOWN;
    } else {
        if (v.x < 0)
            return Direction.LEFT;
        else
            return Direction.RIGHT;
    }
}

export function getuid() {
    return id++;
}
