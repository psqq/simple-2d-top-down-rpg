import Entity from "../core/entity";
import { GameAnimation } from "../core/game-animation";
import { HERO_WALK_UP } from "../animation-manager";
import { Mainloop } from "../core/mainloop";
import Game from "../game";
import { Victor } from "../core/libs";

export default class HeroEnity extends Entity {
    walkUpAnimation: GameAnimation;
    currentAnimation: GameAnimation;
    game: Game;
    isMoving: boolean = false;
    constructor(game: Game) {
        super();
        this.game = game;
    }
    setVelocity(vel: Victor) {
    }
    create() {
        this.walkUpAnimation = HERO_WALK_UP.getAnimation(this.game.mainloop);
        this.currentAnimation = this.walkUpAnimation;
    }
    update() {
        if (this.isMoving)
            this.currentAnimation.update();
    }
    draw() {
        this.game.canvas.drawTileByCenter(
            this.currentAnimation.getCurrentTile(),
            this.positionOfCenterInWorld
        );
    }
}
