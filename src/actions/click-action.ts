import Game from "../game";
import DataAction from "../core/data-action";
import DoorEnity from "../entities/door-entity";

export default class ClickAction implements DataAction<MouseEvent> {
    private game: Game;
    constructor(game: Game) {
        this.game = game;
    }
    execute(ev: MouseEvent) {
        var pos = this.game.gameCamera.getPositionByMouseEvent(ev);
        var entitiesUnderPosition = this.game.entitiesManager.findAll(pos);
        for(var e of entitiesUnderPosition) {
            if (e instanceof DoorEnity) {
                e.open();
            }
        }
    }
}
