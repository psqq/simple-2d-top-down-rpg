import { Victor } from "./libs";

export default interface Positionable {
    getSize(): Victor;
    setLeftTopPosition(pos: Victor);
}
