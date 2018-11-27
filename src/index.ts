import Game from './game';

async function main() {
    const game = new Game();
    await game.load();
    game.init().run();
}

main();

var x = null;

console.log(x == undefined);
