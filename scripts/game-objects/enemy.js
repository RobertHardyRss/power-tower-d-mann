//@ts-check

import { enemySprite } from "../utility/sprite-sheet.js";
import { canvas } from "../utility/canvas.js";

export class Enemy {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(ctx, x, y) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.level = 1;
		this.speed = 1;
		this.health = 1;
		this.isAlive = true;
		this.xDirection = 1;
		this.yDirection = 1;
		this.color = "black";
		this.width = 200;
		this.height = 150;
		this.angle = Math.atan2(this.y, this.x);
		this.lastDirectionChange = 0;
		this.changeInterval = Math.random() * 750 + 250;
		this.setRandomDirection();
		this.setRandomColor();
		this.sprite = enemySprite;
		this.image = enemySprite.image;
		this.baseFrame = this.sprite.getFrame("enemy-heavy-fighter-2.png");
	}

	getRandomDirection() {
		return Math.random() > 0.5 ? 1 : -1;
	}

	setRandomDirection() {
		this.xDirection = this.getRandomDirection();
		this.yDirection = this.getRandomDirection();
	}

	setRandomColor() {
		let hue = Math.floor(Math.random() * 360);
		let hsl = `hsl(${hue}, 100%, 50%)`;
		this.color = hsl;
	}

	update(elapsedTime) {
		this.lastDirectionChange += elapsedTime;
		if (this.isAlive && this.health <= 0) {
			this.isAlive = false;
		}

		if (!this.isAlive) return;

		if (this.lastDirectionChange >= this.changeInterval) {
			this.lastDirectionChange = 0;
			this.setRandomDirection();
		}
	}



	draw() {
		if (!this.isAlive) return;
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle)
		this.ctx.drawImage(
			this.image,
			this.baseFrame.frame.x, // sx
			this.baseFrame.frame.y, // sy
			this.baseFrame.sourceSize.w, // sw
			this.baseFrame.sourceSize.h, // sh
			-this.width * this.baseFrame.pivot.x, // dx
			-this.height * this.baseFrame.pivot.y, // dy
			this.width, // dw
			this.height // dh
		);

		this.ctx.restore();
	}
}

export class EnemyDrone extends Enemy {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(ctx, x, y) {
		super(ctx, x, y);

		this.speed = 1;
		this.angle2 = Math.atan2(this.y, this.x);
		this.xOffset = Math.cos(this.angle2);
		this.yOffset = Math.sin(this.angle2);

	}

	update(elapsedTime) {
		this.x -= this.xOffset * this.speed;
		this.y -= this.yOffset * this.speed;
	}
}
