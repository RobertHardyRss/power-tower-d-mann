//@ts-check
import { Game } from "./game-objects/game.js";
import { ctx, canvas } from "./utility/canvas.js";

let game = new Game(ctx, canvas);

let currentTime = 0;

/**
 * @param {number} timestamp
 */
function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;

	if (!game.isGameOver) {
		game.update(elapsedTime);
		game.draw();
	}

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

window.addEventListener("keydown", (e) => {
	if (!game.isGameOver) return;
	if (e.code === "Enter") {
		window.location.reload();
	}
});

// document.addEventListener(EVENTS.playerHealthChange, (e) => {
// 	//@ts-ignore e is a custom event
// 	console.log(EVENTS.playerHealthChange, e.detail);
// });
// document.addEventListener(EVENTS.playerDeath, () => {
// 	//@ts-ignore e is a custom event
// 	console.log(EVENTS.playerDeath);
// });
// document.addEventListener(EVENTS.creditChange, (e) => {
// 	//@ts-ignore e is a custom event
// 	console.log(EVENTS.creditChange, e.detail);
// });
