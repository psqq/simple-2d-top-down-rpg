import { GameAnimation } from "../core/game-animation";
import { HERO_WALK_UP, HERO_WALK_DOWN, HERO_WALK_LEFT, HERO_WALK_RIGHT, HERO_PUNCH_UP, HERO_PUNCH_DOWN, HERO_PUNCH_LEFT, HERO_PUNCH_RIGHT, OPEN_DOOR } from "../animation-manager";
import Game from "../game";
import { Victor, Matter } from "../core/libs";
import { directionVectorToDirection } from "../core/utils";
import Direction from "../core/direction";
import { CLOSED_DOOR } from "../image-manager";
import Sprite from "../core/sprite";
import PhysicalEntity from "../core/physical-entity";
import PhysicsEngine from "../core/physics-engine";
import Tile from "../core/tile";

export default class DoorEnity extends PhysicalEntity {
    openDoorAnimation: GameAnimation;
    isAnimation: boolean = false;
    game: Game;
    currentTile: Tile;
    sprite: Sprite;
    bodySize: Victor = new Victor(16, 16);
    constructor(game: Game) {
        super();
        this.game = game;
        this.sprite = new Sprite(this.game.canvas);
    }
    init() {
        this.openDoorAnimation = OPEN_DOOR.getAnimation(this.game.mainloop);
        this.sprite.setTile(this.openDoorAnimation.getTile(0));
        super.init(this.game.physicsEngine.world);
        var settings = PhysicsEngine.getArcadeBodySettings();
        settings.isStatic = true;
        this.createRectangleBody(this.bodySize, settings);
    }
    open() {
        this.isAnimation = true;
        this.openDoorAnimation
            .playFromBeginning()
            .loop(false)
            .once('done', () => {
                Matter.Composite.remove(this.bodyContainer, this.body);
                this.isAnimation = false;
            });
    }
    update() {
        super.update();
        if (this.isAnimation) {
            this.openDoorAnimation.update();
            if (!this.isAnimation) {
                this.sprite.setTile(this.openDoorAnimation.getTile(3));
            } else {
                this.sprite.setTile(this.openDoorAnimation.getCurrentTile());
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
