//@ts-check
import { RoundThing } from "./game-objects/round-thing.js";
import { Turret } from "./game-objects/turret.js";

/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

class Game {
	constructor() {
		this.player = {
			health: 100,
			credits: 0,
		};
		this.gridSize = 32;
		this.currentLevel = undefined;
	}
}

class GameLevel {
	constructor() {}
}
// let g = new Game();
// g.player.health;

let roundThings = [];

for (let i = 0; i < 1; i++) {
	roundThings.push(new RoundThing(ctx, canvas.width / 2, canvas.height / 2));
}

let turrets = [
	new Turret(ctx, 100, 100, roundThings),
	new Turret(ctx, canvas.width - 100, 100, roundThings),
	new Turret(ctx, 100, canvas.height - 100, roundThings),
	new Turret(ctx, canvas.width - 100, canvas.height - 100, roundThings),
];

let lastDirectionChange = 0;
let currentTime = 0;

function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;
	lastDirectionChange += elapsedTime;

	console.log(timestamp, elapsedTime);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	roundThings.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	turrets.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	// t1.update(elapsedTime);
	// t1.draw();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
