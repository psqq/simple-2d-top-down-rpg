import Game from "../game";
import FinisingAction from "../core/finishing-action";
import Direction from "../core/direction";

export default class MoveAction extends FinisingAction {
    private game: Game;
    private dir: Direction;
    constructor(game: Game, dir: Direction) {
        super();
        this.game = game;
        this.dir = dir;
    }
    execute() {
        super.execute();
        var hero = this.game.player.entity;
        hero.dirMovement.goDirection(this.dir);
    }
    finish() {
        super.finish();
        var hero = this.game.player.entity;
        hero.dirMovement.stopGoDirection(this.dir);
    }
}
