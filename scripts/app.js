//@ts-check
import { Game } from "./game-objects/game.js";
import { ctx, canvas } from "./utility/canvas.js";
import { EVENTS } from "./utility/events.js";

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

document.addEventListener(EVENTS.playerHealthChange, (e) => {
	console.log(EVENTS.playerHealthChange, e.detail);
});
document.addEventListener(EVENTS.playerDeath, (e) => {
	console.log(EVENTS.playerDeath, e.detail);
});
document.addEventListener(EVENTS.creditChange, (e) => {
	console.log(EVENTS.creditChange, e.detail);
});
