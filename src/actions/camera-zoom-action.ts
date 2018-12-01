import Game from "../game";
import Action from "../core/action";
import Direction from "../core/direction";

export default class CameraZoomAction implements Action {
    private game: Game;
    private delta: number = 0;
    constructor(game: Game, delta: number) {
        this.game = game;
        this.delta = delta;
    }
    execute() {
        this.game.gameCamera.changeScale(this.delta);
    }
}
