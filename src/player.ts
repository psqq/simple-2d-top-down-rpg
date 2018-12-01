import HeroEnity from "./entities/hero-entity";
import Game from "./game";
import { moveLeftAction, moveRightAction, moveUpAction, moveDownAction, cameraZoomOutAction, cameraZoomInAction, moveToTargetAction } from "./action-manager";
import { Victor } from "./core/libs";

export default class Player {
    entity: HeroEnity;
    game: Game;
    constructor(game: Game) {
        this.game = game;
    }
    init() {
        this.entity = new HeroEnity(this.game);
        this.entity.init();
        this.entity.setPosition(new Victor(54 * 16 + 8, 50 * 16 - 8));
        this.game.entitiesManager.addEntity(this.entity);
        this.game.eventManager.onOnlyKeyDwon('a', moveLeftAction);
        this.game.eventManager.onOnlyKeyDwon('d', moveRightAction);
        this.game.eventManager.onOnlyKeyDwon('w', moveUpAction);
        this.game.eventManager.onOnlyKeyDwon('s', moveDownAction);
        this.game.eventManager.onScrollDown(cameraZoomOutAction);
        this.game.eventManager.onScrollUp(cameraZoomInAction);
        this.game.eventManager.onMouseDown(moveToTargetAction);
    }
}
