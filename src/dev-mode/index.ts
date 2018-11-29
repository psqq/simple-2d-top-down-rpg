import Game from "../game";
import { Victor, Matter } from '../core/libs';

var game: Game;
var gameDraw: () => Game;

function drawBody(body: Matter.Body, color = 'black') {
    var ctx = game.canvas.context;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    var p = body.vertices[0];
    ctx.moveTo(p.x, p.y);
    for (var i = 1; i < body.vertices.length; i++) {
        p = body.vertices[i];
        ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function beforDraw() {}

function afterDraw() {
    for(var body of game.physicsEngine.world.bodies) {
        if (body.isStatic) {
            drawBody(body, 'red');
        }
    }
}

function draw(): Game {
    beforDraw();
    gameDraw.apply(game);
    afterDraw();
    return game;
}

export function init(aGame: Game) {
    console.log('Debug mode inited');
    game = aGame;
    gameDraw = game.draw;
    game.draw = draw;
}
