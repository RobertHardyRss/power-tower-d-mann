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
<<<<<<< HEAD
		this.xDirection = 1;
		this.yDirection = 1;
		this.color = "black";
		this.radius = Math.random() * 30 + 10;
		this.health = 100
		this.isAlive = true
		this.speed = 1.5
=======
		this.level = 1;
		this.speed = 1;
		this.health = 1;
		this.isAlive = true;
		this.xDirection = 1;
		this.yDirection = 1;
		this.color = "black";
		this.width = 200;
		this.height = 150;
		this.radius = 100;
		this.angle = Math.atan2(this.y, this.x);
>>>>>>> 198598e6dd7a8f35ca22eac246fceab46b5128a5
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
		if (!this.isAlive) return
		this.lastDirectionChange += elapsedTime;
<<<<<<< HEAD

		if (this.lastDirectionChange >= this.changeInterval || this.y < 0 || this.x < 0 || this.y + this.radius > 800 || this.x + this.radius > 1376) {
			this.lastDirectionChange = 0;
			this.setRandomDirection();
		}
		if (this.isAlive && this.health <= 0){
			this.isAlive = false
		}

		this.x += this.xDirection * this.speed;
		this.y += this.yDirection * this.speed;
	}

	draw() {
		if (!this.isAlive) return
=======
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
		this.ctx.rotate(this.angle);
		this.ctx.drawImage(
			this.image,
			this.baseFrame.frame.x, // sx
			this.baseFrame.frame.y, // sy
			this.baseFrame.frame.w, // sw
			this.baseFrame.frame.h, // sh
			-this.width * this.baseFrame.pivot.x, // dx
			-this.height * this.baseFrame.pivot.y, // dy
			this.width, // dw
			this.height // dh
		);
		this.ctx.restore();

>>>>>>> 198598e6dd7a8f35ca22eac246fceab46b5128a5
		this.ctx.beginPath();
		this.ctx.fillStyle = "hsla(0, 100%, 50%, 0.2)";
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.ctx.fill();
<<<<<<< HEAD
=======
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

		this.radius = 20;
		this.width = this.radius * 2;
		this.height =
			(this.baseFrame.frame.h * this.width) / this.baseFrame.frame.w;
	}

	update(elapsedTime) {
		this.x -= this.xOffset * this.speed;
		this.y -= this.yOffset * this.speed;
>>>>>>> 198598e6dd7a8f35ca22eac246fceab46b5128a5
	}
}
