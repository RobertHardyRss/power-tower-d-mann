//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 1376;
canvas.height = 800;
import { Turret } from "./game-objects/Turret.js";
import { Enemy } from "./game-objects/Enemy.js";
import { Projectile } from "./game-objects/projectiles.js";

class Game {
	constructor() {
		this.Player = {
			health: 100,
			credits: 0,
		};
		this.gridSize = 32;
		this.currentLevel = undefined;
		/**@type {Turret[]} */
		this.turrets = [];
		/**@type {Enemy[]} */
		this.enemies = [];
		/**@type {Projectile[]} */
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
            if (t.projectiles.length > 0) {
            this.projectiles = this.projectiles.concat(t.projectiles);
            }
		});
        this.enemies = this.enemies.filter((e) => e.isAlive)
		this.projectiles.forEach((p) => {
			for (let i = 0; i < this.enemies.length; i++) {
				let enemy = this.enemies[i];
				let distance = Math.hypot(p.x - enemy.x, p.y - enemy.y) - enemy.radius;
				if (distance <= 0) {
					enemy.health -= p.damage;
					p.isVisible = false;
				}
			}
		});
	}
}
let game = new Game();

game.turrets = [
	new Turret(ctx, 200, 200),
	new Turret(ctx, canvas.width - 200, 200),
	new Turret(ctx, 200, canvas.height - 200),
	new Turret(ctx, canvas.width - 200, canvas.height - 200),
];

for (let i = 0; i < 10; i++) {
	game.enemies.push(new Enemy(ctx, canvas.width / 2, canvas.height / 2));
}

game.initTurrets();
let lastDirectionChange = 0;
let currentTime = 0;

function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;
	lastDirectionChange += elapsedTime;
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


	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
