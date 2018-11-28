import HeroEnity from "./entities/hero-entity";
import Game from "./game";
import { moveLeftAction, moveRightAction, moveUpAction, moveDownAction } from "./action-manager";

export default class Player {
    entity: HeroEnity;
    game: Game;
    constructor(game: Game) {
        this.game = game;
    }
    init() {
        this.entity = new HeroEnity(this.game);
        this.entity.init();
        this.game.eventManager.onOnlyKeyDwon('a', moveLeftAction);
        this.game.eventManager.onOnlyKeyDwon('d', moveRightAction);
        this.game.eventManager.onOnlyKeyDwon('w', moveUpAction);
        this.game.eventManager.onOnlyKeyDwon('s', moveDownAction);
    }
    update() {
        this.entity.update();
    }
    draw() {
        this.entity.draw();
    }
}
