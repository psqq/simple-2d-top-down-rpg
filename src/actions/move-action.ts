import Game from "../game";
import { Victor } from "../core/libs";
import FinisingAction from "../core/finishing-action";

export default class MoveAction extends FinisingAction {
    private game: Game;
    private dirVector: Victor = new Victor(0, 0);
    constructor(game: Game, dir: Victor) {
        super();
        this.game = game;
        this.dirVector = dir;
    }
    execute() {
        super.execute();
        var hero = this.game.player.entity;
        hero.dirVector.add(this.dirVector);
    }
    finish() {
        super.finish();
        var hero = this.game.player.entity;
        hero.dirVector.subtract(this.dirVector);
    }
}
