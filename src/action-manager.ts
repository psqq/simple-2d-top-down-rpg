import MoveAction from "./actions/move-action";
import Game from "./game";
import { Victor } from "./core/libs";
import Direction from "./core/direction";
import CameraZoomAction from "./actions/camera-zoom-action";

export var
    moveLeftAction,
    moveRightAction,
    moveUpAction,
    moveDownAction,
    cameraZoomOutAction,
    cameraZoomInAction;

export function init(game: Game) {
    moveLeftAction = new MoveAction(game, Direction.LEFT);
    moveRightAction = new MoveAction(game, Direction.RIGHT);
    moveUpAction = new MoveAction(game, Direction.UP);
    moveDownAction = new MoveAction(game, Direction.DOWN);
    cameraZoomOutAction = new CameraZoomAction(game, -0.1);
    cameraZoomInAction = new CameraZoomAction(game, 0.1);
}
