//@ts-check

import { ENEMY_SPAWN_POINTS } from "../utility/constants.js";
import { EVENTS, ToggleUpgradeUiEvent } from "../utility/events.js";
import { starFieldBackground } from "./background.js";
import { Enemy, EnemyDrone, CircleDrone } from "./enemy.js";
import { Explosion } from "./explosion.js";
import { PlayerShip } from "./player-ship.js";
import { Projectile } from "./projectile.js";
import { GameOverPanel, PlayerStatsPanel, TurretUpgradePanel } from "./user-interface.js";

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
			maxHealth: 100,
			credits: 0,
		};

		this.scale = 1;
		this.playerShip = new PlayerShip(this.ctx);
		this.showUpgradeGui = false;
		this.isGamePaused = false;
		this.isGameOver = false;
		this.gameOverPanel = new GameOverPanel(this.ctx);

		/** @type { Explosion[] } */
		this.explosions = [];

		/** @type { Enemy[] } */
		this.enemies = [];
		this.maxEnemies = 20;

		/** @type { Projectile[] } */
		this.projectiles = [];

		this.difficultyLevel = 1;
		this.timers = {
			lastEnemySpawnTimer: 0,
			enemySpawnInterval: 2000,

			difficultyLevelTimer: 0,
			difficultyLevelInterval: 15000,
		};

		/** @type {TurretUpgradePanel[]} */
		this.upgradePanels = [];

		this.playerShip.turrets.forEach((t) => {
			this.upgradePanels.push(new TurretUpgradePanel(this.ctx, t));
		});

		this.playerStatsPanel = new PlayerStatsPanel(this.ctx, this.player.credits, this.player.health);
		this.wireUpEventListeners();
	}

	/**
	 * @param {number} elapsedTime
	 */
	update(elapsedTime) {
		if (this.isGamePaused) return;

		starFieldBackground.update();
		this.spawnEnemy(elapsedTime);

		this.enemies.forEach((e) => {
			e.playerCollisionCheck(this.playerShip);
			e.update(elapsedTime);
		});

		this.explosions.forEach((e) => {
			e.update(elapsedTime);
		});
		this.playerShip.update(elapsedTime);

		this.projectiles = [];

		this.playerShip.turrets.forEach((t) => {
			t.targets = this.enemies;
			if (t.projectiles.length > 0) {
				this.projectiles = this.projectiles.concat(t.projectiles);
			}
		});

		this.ctx.save();
		this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

		for (let p = 0; p < this.projectiles.length; p++) {
			for (let e = 0; e < this.enemies.length; e++) {
				const enemy = this.enemies[e];
				const projectile = this.projectiles[p];

				if (enemy.isPointInHitBox(projectile.x, projectile.y)) {
					enemy.health -= projectile.damage;
					projectile.isVisible = false;
					//debugger;
					//console.log("hit", enemy, projectile);
				}
			}
		}

		this.ctx.restore();
		this.enemies.forEach((e) => {
			if (!e.isAlive) {
				this.explosions.push(new Explosion(e.x, e.y, 100, this.ctx));
			}
		});
		this.enemies = this.enemies.filter((e) => e.isAlive);
		this.explosions = this.explosions.filter((e) => !e.done);
	}

	draw() {
		if (this.isGameOver) {
			this.gameOverPanel.draw();
			return;
		}

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		starFieldBackground.draw();

		this.ctx.save();
		this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
		this.ctx.scale(this.scale, this.scale);

		this.playerShip.draw();
		this.enemies.forEach((e) => {
			e.draw();
		});
		this.explosions.forEach((e) => {
			e.draw();
		});
		this.ctx.restore();

		this.playerStatsPanel.draw();

		if (this.showUpgradeGui) {
			this.upgradePanels.forEach((p) => {
				p.draw();
			});
		}
	}

	/**
	 * @param {CustomEvent} event
	 */
	handleHealthChange(event) {
		this.player.health += event.detail;
		// don't go over max health
		this.player.health = Math.min(this.player.maxHealth, this.player.health);
		if (this.player.health <= 0) {
			document.dispatchEvent(new Event(EVENTS.playerDeath));
		}
	}

	handlePlayerDeath() {
		this.isGameOver = true;
	}

	/**
	 * @param {WheelEvent} event
	 */
	handleScroll(event) {
		// don't scroll the window (default behavior)
		event.preventDefault();

		// change the scaling factor based on whether we are zooming in or out
		const direction = event.deltaY > 0 ? 1 : -1;
		this.scale += 0.1 * direction;
		this.scale = Math.min(Math.max(0.5, this.scale), 2);
		//console.log("scale", this.scale, e.deltaY);
	}

	handleResize() {
		// when the window is resized make sure we set our
		// canvas width and height to the new window size
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	/**
	 * @param {KeyboardEvent} event
	 */
	handleKeydown(event) {
		switch (event.code) {
			case "Space":
				// toggle the upgrade GUI when space bar is pressed
				this.showUpgradeGui = !this.showUpgradeGui;
				// throw an event so other objects can sync up
				document.dispatchEvent(
					new CustomEvent(EVENTS.toggleUpgradeUi, {
						detail: new ToggleUpgradeUiEvent(this.showUpgradeGui),
					})
				);
				//console.log(e.code, "showUpgradeGui", this.showUpgradeGui);
				break;
			case "Escape":
				// toggle paused game when escape key is pressed
				this.isGamePaused = !this.isGamePaused;
				//console.log(e.code, "isGamePaused", this.isGamePaused);
				break;
		}
	}

	wireUpEventListeners() {
		this.canvas.addEventListener("wheel", this.handleScroll.bind(this));
		window.addEventListener("resize", this.handleResize.bind(this));
		window.addEventListener("keydown", this.handleKeydown.bind(this));
		document.addEventListener(EVENTS.playerHealthChange, this.handleHealthChange.bind(this));
		document.addEventListener(EVENTS.playerDeath, this.handlePlayerDeath.bind(this));
	}

	/**
	 * @param {number} elapsedTime
	 */
	spawnEnemy(elapsedTime) {
		this.timers.difficultyLevelTimer += elapsedTime;
		this.timers.lastEnemySpawnTimer += elapsedTime;

		const increaseDifficulty = this.timers.difficultyLevelTimer >= this.timers.difficultyLevelInterval;
		const spawnEnemy = this.timers.lastEnemySpawnTimer >= this.timers.enemySpawnInterval;

		if (increaseDifficulty) {
			this.difficultyLevel++;
			document.dispatchEvent(new Event(EVENTS.difficultyIncrease));
			this.timers.difficultyLevelTimer = 0;
			this.timers.enemySpawnInterval = Math.max(100, this.timers.enemySpawnInterval - 100);
		}

		if (!spawnEnemy || this.enemies.length > this.maxEnemies) return;

		this.timers.lastEnemySpawnTimer = 0;
		this.enemies.push(this.getRandomEnemy());
	}

	/** @returns Enemy */
	getRandomEnemy() {
		// get a random number for the different types which we can
		// use to control the probability of a certain type spawning
		const enemyType = Math.floor(Math.random() * 8) + 1;

		// get a random level based on the current difficulty level
		const enemyLevel = Math.floor(Math.random() * this.difficultyLevel) + 1;

		// get a random spawn location from the enemy spawn points
		const spawnLocation = ENEMY_SPAWN_POINTS[Math.floor(Math.random() * ENEMY_SPAWN_POINTS.length)];

		switch (enemyType) {
			case 1:
			case 2:
			case 3:
				return new CircleDrone(this.ctx, spawnLocation.x, spawnLocation.y, enemyLevel);
				break;
			default:
				return new EnemyDrone(this.ctx, spawnLocation.x, spawnLocation.y, enemyLevel);
				break;
		}
	}
}
