//@ts-check
import { Enemy } from "./game-objects/enemy.js";
import { Projectile } from "./game-objects/projectile.js";
import { PointDefenseTurret, Turret } from "./game-objects/turret.js";
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
		this.gridsize = 32;
		this.currentLevel = undefined;
		/** @type {Turret[] } */
		this.turrets = [];
		/**@type {Enemy[] } */
		this.enemies = [];
		/**@type {Projectile[] } */
		this.projectiles = [];
	}

	initTurrets() {
		this.turrets.forEach((t) => {
			t.targets = this.enemies;
			this.projectiles.concat(t.projectiles);
		});
	}
	update() {
		this.projectiles = [];
		this.turrets.forEach((t) => {
			t.targets = this.enemies;
			if (t.projectiles.length > 0) {
				this.projectiles = this.projectiles.concat(t.projectiles);
			}
		});

		this.projectiles.forEach((p) => {
			for (let i = 0; i < this.enemies.length; i++) {
				let enemy = this.enemies[i];
				let distance =
					Math.hypot(p.x - enemy.x, p.y - enemy.y) - enemy.radius;
				if (distance <= 0) {
					enemy.health -= p.damage;
					p.isVisible = false;
					console.log(enemy, p, distance);
				}
			}
		});

		this.enemies = this.enemies.filter((e) => e.isAlive);
	}
}

class Level {
	constructor() {}
}
let game = new Game();
//g.player.health;

// let enemies = [];

game.turrets = [
	new PointDefenseTurret(ctx, 100, 100),
	new Turret(ctx, canvas.width - 100, 100),
	new Turret(ctx, 100, canvas.height - 100),
	new Turret(ctx, canvas.width - 100, canvas.height - 100),
];

for (let i = 0; i < 200; i++) {
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

	game.update();

	// t1.update(elapsedTime);
	// t1.draw();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
