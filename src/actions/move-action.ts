import Game from "../game";
import { Victor } from "../core/libs";
import FinisingAction from "../core/finishing-action";

var actions: MoveAction[] = [];

export default class MoveAction implements FinisingAction {
    private game: Game;
    private dirVector: Victor = new Victor(0, 0);
    private zeroVector: Victor = new Victor(0, 0);
    private isRunning: boolean;
    constructor(game: Game, dir: Victor) {
        this.game = game;
        this.dirVector = dir;
        actions.push(this);
    }
    execute() {
        var hero = this.game.player.entity;
        this.isRunning = true;
        hero.move(this.dirVector);
    }
    isExecuted() {
        return this.isRunning;
    }
    finish() {
        this.isRunning = false;
        if (actions.some(a => a.isExecuted())) {
            return;
        }
        var hero = this.game.player.entity;
        hero.move(this.zeroVector);
    }
}
