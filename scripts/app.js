//@ts-check
import { Enemy } from "./game-objects/enemy.js";
import { Projectile } from "./game-objects/projectile.js";
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

		/** @type { Turret[] } */
		this.turrets = [];
		/** @type { Enemy[] } */
		this.enemies = [];
		/** @type { Projectile[] } */
		this.projectiles = [];
	}

	initTurrets() {
		this.turrets.forEach((t) => {
			t.targets = this.enemies;
		});
	}

	update() {
		this.projectiles = [];
		this.turrets.forEach((t) => {
			t.targets = this.enemies;
			this.projectiles.concat(t.projectiles);
		});

	}
}

class GameLevel {
	constructor() {}
}

let game = new Game();

game.turrets = [
	new Turret(ctx, 100, 100),
	new Turret(ctx, canvas.width - 100, 100),
	new Turret(ctx, 100, canvas.height - 100),
	new Turret(ctx, canvas.width - 100, canvas.height - 100),
];

for (let i = 0; i < 1; i++) {
	game.enemies.push(new Enemy(ctx, canvas.width / 2, canvas.height / 2));
}

game.initTurrets();

let lastDirectionChange = 0;
let currentTime = 0;

function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;
	lastDirectionChange += elapsedTime;

	console.log(timestamp, elapsedTime);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	game.enemies.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	game.turrets.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	// t1.update(elapsedTime);
	// t1.draw();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
