import Game from "../game";
import DataAction from "../core/data-action";

export default class MoveToTargeAction implements DataAction<MouseEvent> {
    private game: Game;
    constructor(game: Game) {
        this.game = game;
    }
    execute(e: MouseEvent) {
        var ent = this.game.player.entity;
        ent.dirMovement.stopMoving();
        var pos = this.game.gameCamera.getPositionByMouseEvent(e);
        ent.targetMovement.goTarget(pos);
    }
}
