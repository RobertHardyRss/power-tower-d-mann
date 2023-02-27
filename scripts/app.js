//@ts-check
import { starFieldBackground } from "./game-objects/background.js";
import { EnemyDrone } from "./game-objects/enemy.js";
import { Game } from "./game-objects/game.js";
import { ctx, canvas } from "./utility/canvas.js";
import { ENEMY_SPAWN_POINTS } from "./utility/constants.js";

let game = new Game(ctx, canvas);

for (let i = 0; i < ENEMY_SPAWN_POINTS.length; i++) {
	let location = ENEMY_SPAWN_POINTS[i];
	game.enemies.push(new EnemyDrone(ctx, location.x, location.y));
}

let currentTime = 0;

/**
 * @param {number} timestamp
 */
function gameLoop(timestamp) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	starFieldBackground.update();
	starFieldBackground.draw();

	ctx.save();
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.scale(game.scale, game.scale);

	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;

	game.enemies.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	game.playerShip.update(elapsedTime);
	game.playerShip.draw();

	game.update();

	ctx.restore();
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
