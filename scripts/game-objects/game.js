//@ts-check

import { Enemy } from "./enemy.js";
import { PlayerShip } from "./player-ship.js";
import { Projectile } from "./projectile.js";


export class Game {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {HTMLCanvasElement} canvas
	 */
	constructor(ctx, canvas) {
		this.ctx = ctx;
		this.canvas = canvas;

		this.player = {
			health: 100,
			credits: 0,
		};

		this.scale = 1;
		this.playerShip = new PlayerShip(this.ctx);

		/** @type { Enemy[] } */
		this.enemies = [];
		/** @type { Projectile[] } */
		this.projectiles = [];

		this.canvas.addEventListener("wheel", (e) => {
			e.preventDefault();
			const direction = e.deltaY > 0 ? 1 : -1;
			this.scale += 0.2 * direction;
			this.scale = Math.min(Math.max(0.25, this.scale), 3);
			//console.log("scale", this.scale, e.deltaY);
		});

		window.addEventListener("resize", (e) => {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		});
	}

	update() {
		this.projectiles = [];

		this.playerShip.turrets.forEach((t) => {
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
					// console.log(enemy, p, distance);
				}
			}
		});

		this.enemies = this.enemies.filter((e) => e.isAlive);
	}
}
