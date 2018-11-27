
export interface Updatable {
    update(): void;
}

export class Mainloop {
    timestamp: number;
    dt: number;
    timeOfLastUpdate: number;
    done: boolean;
    updatableObject: Updatable;
    constructor(updatableObject: Updatable) {
        this.timestamp = 0;
        this.dt = 0;
        this.timeOfLastUpdate = 0;
        this.done = false;
        this.updatableObject = updatableObject;
    }
    run() {
        this.done = false;
        var go = () => {
            if (this.done) return;
            this.timestamp = performance.now();
            this.dt = this.timestamp - this.timeOfLastUpdate;
            this.timeOfLastUpdate = this.timestamp;
            if (this.updatableObject) {
                this.updatableObject.update();
            }
            requestAnimationFrame(go);
        };
        this.timeOfLastUpdate = performance.now();
        requestAnimationFrame(go);
    }
    stop() {
        this.done = true;
    }
}
