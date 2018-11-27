import { loadImage } from "./utils";

export class GameImage {
    name: string;
    img: HTMLImageElement;
    src: string;
    constructor(name, src) {
        this.src = src;
        this.name = name;
    }
    async load() {
        this.img = await loadImage(this.src);
        return this;
    }
}
