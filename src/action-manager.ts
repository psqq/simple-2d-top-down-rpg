import MoveAction from "./actions/move-action";
import Game from "./game";
import { Victor } from "./core/libs";

export var
    moveLeftAction,
    moveRightAction,
    moveUpAction,
    moveDownAction;

export function init(game: Game) {
    moveLeftAction = new MoveAction(game, new Victor(-1, 0));
    moveRightAction = new MoveAction(game, new Victor(1, 0));
    moveUpAction = new MoveAction(game, new Victor(0, -1));
    moveDownAction = new MoveAction(game, new Victor(0, 1));
}
