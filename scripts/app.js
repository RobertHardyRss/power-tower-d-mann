//@ts-check
import { Game } from "./game-objects/game.js";
import { panels } from "./game-objects/user-interface.js";
import { ctx, canvas } from "./utility/canvas.js";

let game = new Game(ctx, canvas);

let currentTime = 0;

/**
 * @param {number} timestamp
 */
function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;

	game.update(elapsedTime);
	game.draw();

	// panels.forEach((p) => {
	// 	p.draw();
	// });

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
