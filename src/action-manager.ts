import MoveAction from "./actions/move-action";
import Game from "./game";
import { Victor } from "./core/libs";
import Direction from "./core/direction";

export var
    moveLeftAction,
    moveRightAction,
    moveUpAction,
    moveDownAction;

export function init(game: Game) {
    moveLeftAction = new MoveAction(game, Direction.LEFT);
    moveRightAction = new MoveAction(game, Direction.RIGHT);
    moveUpAction = new MoveAction(game, Direction.UP);
    moveDownAction = new MoveAction(game, Direction.DOWN);
}
