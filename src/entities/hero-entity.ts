import Entity from "../core/entity";
import { GameAnimation } from "../core/game-animation";
import { HERO_WALK_UP, HERO_WALK_DOWN, HERO_WALK_LEFT, HERO_WALK_RIGHT, HERO_PUNCH_UP, HERO_PUNCH_DOWN, HERO_PUNCH_LEFT, HERO_PUNCH_RIGHT } from "../animation-manager";
import Game from "../game";
import { Victor } from "../core/libs";
import { directionVectorToDirection } from "../core/utils";
import Direction from "../core/direction";
import { HERO_IDLE_DOWN, HERO_IDLE_LEFT, HERO_IDLE_UP, HERO_IDLE_RIGHT } from "../image-manager";
import Sprite from "../core/sprite";

export default class HeroEnity extends Entity {
    walkUp: GameAnimation;
    walkDown: GameAnimation;
    walkLeft: GameAnimation;
    walkRight: GameAnimation;
    punchUp: GameAnimation;
    punchDown: GameAnimation;
    punchLeft: GameAnimation;
    punchRight: GameAnimation;
    currentAnimation: GameAnimation;
    game: Game;
    isAnimation: boolean = false;
    isPunch: boolean = false;
    speed: number = 0.1;
    sprite: Sprite;
    constructor(game: Game) {
        super();
        this.game = game;
        this.sprite = new Sprite(this.game.canvas);
        this.sprite.setTile(HERO_IDLE_DOWN);
    }
    init() {
        this.walkUp = HERO_WALK_UP.getAnimation(this.game.mainloop);
        this.walkDown = HERO_WALK_DOWN.getAnimation(this.game.mainloop);
        this.walkLeft = HERO_WALK_LEFT.getAnimation(this.game.mainloop);
        this.walkRight = HERO_WALK_RIGHT.getAnimation(this.game.mainloop);
        this.punchUp = HERO_PUNCH_UP.getAnimation(this.game.mainloop);
        this.punchDown = HERO_PUNCH_DOWN.getAnimation(this.game.mainloop);
        this.punchLeft = HERO_PUNCH_LEFT.getAnimation(this.game.mainloop);
        this.punchRight = HERO_PUNCH_RIGHT.getAnimation(this.game.mainloop);
        this.currentAnimation = this.walkUp;
    }
    move(dirVector: Victor) {
        if (this.isPunch) {
            return;
        }
        var dir = directionVectorToDirection(dirVector);
        switch (dir) {
            case Direction.LEFT:
                this.currentAnimation = this.walkLeft;
                break;
            case Direction.RIGHT:
                this.currentAnimation = this.walkRight;
                break;
            case Direction.UP:
                this.currentAnimation = this.walkUp;
                break;
            case Direction.DOWN:
                this.currentAnimation = this.walkDown;
                break;
            case Direction.NONE:
                this.isAnimation = false;
                if (this.currentAnimation === this.walkLeft) {
                    this.sprite.setTile(HERO_IDLE_LEFT);
                } else if (this.currentAnimation === this.walkUp) {
                    this.sprite.setTile(HERO_IDLE_UP);
                } else if (this.currentAnimation === this.walkDown) {
                    this.sprite.setTile(HERO_IDLE_DOWN);
                } else if (this.currentAnimation === this.walkRight) {
                    this.sprite.setTile(HERO_IDLE_RIGHT);
                }
                return;
        }
        this.isAnimation = true;
    }
    punch(dirVector: Victor) {
        var dir = directionVectorToDirection(dirVector);
        switch (dir) {
            case Direction.LEFT:
                this.currentAnimation = this.walkLeft;
                break;
            case Direction.RIGHT:
                this.currentAnimation = this.walkRight;
                break;
            case Direction.UP:
                this.currentAnimation = this.walkUp;
                break;
            case Direction.DOWN:
                this.currentAnimation = this.walkDown;
                break;
            case Direction.NONE:
                this.isAnimation = false;
                this.isPunch = false;
                return;
        }
        this.isAnimation = true;
        this.isPunch = true;
        this.currentAnimation
            .playFromBeginning()
            .loop(false)
            .once('done', () => {
                this.isPunch = false;
                this.isAnimation = false;
            });
    }
    update() {
        if (this.isAnimation) {
            this.currentAnimation.update();
            this.sprite.setTile(this.currentAnimation.getCurrentTile());
            if (this.currentAnimation == this.walkDown) {
                this.positionOfCenterInWorld.y += this.game.mainloop.dt * this.speed;
            }
            if (this.currentAnimation == this.walkUp) {
                this.positionOfCenterInWorld.y -= this.game.mainloop.dt * this.speed;
            }
            if (this.currentAnimation == this.walkRight) {
                this.positionOfCenterInWorld.x += this.game.mainloop.dt * this.speed;
            }
            if (this.currentAnimation == this.walkLeft) {
                this.positionOfCenterInWorld.x -= this.game.mainloop.dt * this.speed;
            }
        }
    }
    draw() {
        this.sprite.positioner
            .center(this.positionOfCenterInWorld)
            .setLeftTopPosition();
        this.sprite.draw();
    }
}
