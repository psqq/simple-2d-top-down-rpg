import Entity from './entity';
import GameCamera from './game-camera';

export default class EntitiesManager {
    gameCamera: GameCamera;
    entities: Entity[] = [];
    constructor(gameCamera: GameCamera) {
        this.gameCamera = gameCamera;
    }
    addEntity(e: Entity) {
        this.entities.push(e);
        return this;
    }
    update() {
        var deferredKill = [];
        for (var e of this.entities) {
            if (e.killed) {
                deferredKill.push(e);
            } else {
                e.update();
            }
        }
        if (deferredKill.length > 0) {
            this.entities = this.entities.filter(e => !(deferredKill.indexOf(e) >= 0));
        }
    }
    sortEntities(entities) {
        entities.sort((a, b) => {
            var aPos = a.getPosition();
            var bPos = b.getPosition();
            if (a.zindex < b.zindex) return -1;
            if (a.zindex > b.zindex) return 1;
            if (aPos.y < bPos.y) return -1;
            if (aPos.y > bPos.y) return 1;
            if (aPos.x < bPos.x) return -1;
            if (aPos.x > bPos.x) return 1;
            return 0;
        });
    }
    draw() {
        var visibleEntities: Entity[] = [];
        var viewRect = {
            x: this.gameCamera.positionInWorld.x,
            y: this.gameCamera.positionInWorld.y,
            w: this.gameCamera.size.x,
            h: this.gameCamera.size.y,
        };
        for (var e of this.entities) {
            var pos = e.getPosition();
            var hw = e.size.x / 2;
            var hh = e.size.y / 2;
            if (
                pos.x < viewRect.x - hw
                || pos.x > viewRect.x + viewRect.w + hw
                || pos.y < viewRect.y - hh
                || pos.y > viewRect.y + viewRect.h + hh
            ) {
                continue;
            }
            visibleEntities.push(e);
        }
        this.sortEntities(visibleEntities);
        for (var e of visibleEntities) {
            e.draw();
        }
    }
}
