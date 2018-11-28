import Game from './game';
import * as devMode from './dev-mode';
import devStatus from './dev-status';

async function main() {
    const game = new Game();
    await game.load();
    game.init();
    if (devStatus)
        devMode.init(game);
    game.run();
}

main();
