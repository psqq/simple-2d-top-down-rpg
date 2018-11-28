import Game from "../game";
import { Victor } from "../core/libs";
import FinisingAction from "../core/finishing-action";

export default class MoveLeftAction implements FinisingAction {
    private game: Game;
    private dirVector: Victor = new Victor(0, 0);
    constructor(game: Game) {
        this.game = game;
    }
    execute() {
        var hero = this.game.player.entity;
        this.dirVector.x = -1;
        console.log('start move left');
        hero.move(this.dirVector);
    }
    isExecuted() {
        return this.dirVector.x === -1;
    }
    finish() {
        console.log('finish move left');
        this.dirVector.x = 0;
        var hero = this.game.player.entity;
        hero.move(this.dirVector);
    }
}
