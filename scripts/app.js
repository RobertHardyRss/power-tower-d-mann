//@ts-check
<<<<<<< HEAD
import { starFieldBackground } from "./game-objects/background.js";
import { Enemy, EnemyDrone } from "./game-objects/enemy.js";
=======
>>>>>>> origin/develop
import { Game } from "./game-objects/game.js";
import { panels } from "./game-objects/user-interface.js";
import { ctx, canvas } from "./utility/canvas.js";

let game = new Game(ctx, canvas);

<<<<<<< HEAD
for (let i = 0; i < 200; i++) {
	let angle = Math.random()*Math.PI*2;
	let x = Math.cos(angle)*1200;
	let y = Math.sin(angle)*1200;
	game.enemies.push(new EnemyDrone(ctx, x, y));	
}

=======
>>>>>>> origin/develop
let currentTime = 0;

/**
 * @param {number} timestamp
 */
function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;

<<<<<<< HEAD
	game.enemies.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	game.playerShip.update(elapsedTime);
	game.playerShip.draw();
	game.update();
=======
	game.update(elapsedTime);
	game.draw();

	// panels.forEach((p) => {
	// 	p.draw();
	// });
>>>>>>> origin/develop

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
