import MoveLeftAction from "./actions/move-left-action";
import Game from "./game";

export var moveLeftAction;

export function init(game: Game) {
    moveLeftAction = new MoveLeftAction(game);
}
