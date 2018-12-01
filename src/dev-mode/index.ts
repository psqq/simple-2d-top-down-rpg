import Game from "../game";
import { Victor, Matter } from '../core/libs';
import Entity from "../core/entity";

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

function drawEntity(e: Entity, color = 'black') {
    var ctx = game.canvas.context;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    var ePos = e.getPosition();
    var x = ePos.x - e.size.x / 2;
    var y = ePos.y - e.size.y / 2;
    ctx.rect(x, y, e.size.x, e.size.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function beforDraw() { }

function afterDraw() {
    for (var body of game.physicsEngine.world.bodies) {
        if (body.isStatic) {
            drawBody(body, 'red');
        } else {
            drawBody(body, 'green');
        }
    }
    for (var e of game.entitiesManager.entities) {
        drawEntity(e);
    }
}

function draw(): Game {
    beforDraw();
    gameDraw.apply(game);
    game.gameCamera.begin();
    afterDraw();
    game.gameCamera.end();
    return game;
}

function replaceGameDraw() {
    gameDraw = game.draw;
    game.draw = draw;
}

export function init(aGame: Game) {
    console.log('Debug mode inited');
    game = aGame;
    // replaceGameDraw();
}
