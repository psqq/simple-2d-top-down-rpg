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
    opened: boolean = false;
    constructor(game: Game) {
        super();
        this.game = game;
        this.sprite = new Sprite(this.game.canvas);
    }
    createDoorBody() {
        var settings = PhysicsEngine.getArcadeBodySettings();
        settings.isStatic = true;
        this.createRectangleBody(this.bodySize, settings);
    }
    init() {
        this.openDoorAnimation =
            OPEN_DOOR.getAnimation(this.game.mainloop)
                .setDuration(300);
        this.sprite.setTile(this.openDoorAnimation.getTile(0));
        super.init(this.game.physicsEngine.world);
        this.createDoorBody();
    }
    openDoor() {
        if (this.isAnimation)
            return;
        this.isAnimation = true;
        this.openDoorAnimation
            .playFromBeginning()
            .loop(false)
            .once('done', () => {
                this.removeBody();
                this.opened = true;
                this.isAnimation = false;
            });
    }
    closeDoor() {
        if (this.isAnimation)
            return;
        this.isAnimation = true;
        this.openDoorAnimation
            .playFromEnding()
            .loop(false)
            .once('done', () => {
                if (this.body) this.removeBody();
                this.createDoorBody();
                this.opened = false;
                this.isAnimation = false;
            });
    }
    update() {
        super.update();
        if (this.isAnimation) {
            this.openDoorAnimation.update();
            if (!this.isAnimation) {
                if (this.opened) {
                    this.sprite.setTile(this.openDoorAnimation.getTile(3));
                } else {
                    this.sprite.setTile(this.openDoorAnimation.getTile(0));
                }
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
