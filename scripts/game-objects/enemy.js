//@ts-check

import { enemySprite } from "../utility/sprite-sheet.js";
import { canvas, normalizePoint } from "../utility/canvas.js";
import { PlayerShip } from "./player-ship.js";

export class Enemy {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 * @param {number} level
	 */
	constructor(ctx, x, y, level) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;

		this.angle = Math.atan2(this.y, this.x);
		this.xOffset = Math.cos(this.angle);
		this.yOffset = Math.sin(this.angle);

		this.level = level;
		this.speed = 1;
		this.health = 1;
		this.isAlive = true;

		this.width = 200;
		this.height = 150;
		// this.radius = 100;

		this.spriteData = enemySprite;
		this.image = enemySprite.image;
		this.spriteFrame = this.spriteData.getFrame("enemy-scout");

		/** @type {Path2D} */
		this.hitBox = this.getShape();
	}

	/** @returns Path2D */
	getShape() {
		// default hit box shape is a rectangle
		let path = new Path2D();
		path.rect(
			-this.width * this.spriteFrame.pivot.x,
			-this.height * this.spriteFrame.pivot.y,
			this.width,
			this.height
		);
		return path;
	}

	/**
	 * @param {number} elapsedTime
	 */
	update(elapsedTime) {
		if (this.isAlive && this.health <= 0) {
			this.isAlive = false;
		}

		if (!this.isAlive) return;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns boolean
	 */
	isPointInHitBox(x, y) {
		// we need the point we are checking to be "de-translated"
		const p = normalizePoint(x, y);

		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);
		this.ctx.strokeStyle = "hsla(0, 0%, 0%, 0)"; // hidden
		this.ctx.stroke(this.hitBox);
		const isInHitBox = this.ctx.isPointInPath(this.hitBox, p.x, p.y);
		this.ctx.restore();
		return isInHitBox;
	}

	draw() {
		if (!this.isAlive) return;
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);
		this.ctx.drawImage(
			this.image,
			this.spriteFrame.frame.x, // sx
			this.spriteFrame.frame.y, // sy
			this.spriteFrame.frame.w, // sw
			this.spriteFrame.frame.h, // sh
			-this.width * this.spriteFrame.pivot.x, // dx
			-this.height * this.spriteFrame.pivot.y, // dy
			this.width, // dw
			this.height // dh
		);

		// uncomment to show hit box
		// this.ctx.fillStyle = "hsla(0, 100%, 50%, 0.2)";
		// this.ctx.fill(this.hitBox);

		this.ctx.restore();
	}

	/**
	 * @param {PlayerShip} player
	 */
	playerDamageCheck(player) {
		// we need our collidable x, y coordinate
		// let x = this.x + this.radius * this.xOffset;
		// let y = this.y + this.radius * this.yOffset;
		// if (this.ctx.isPointInPath(player.shipPath, x, y)) {
		// 	// hit the player
		// }
	}
}

export class EnemyDrone extends Enemy {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 * @param {number} level
	 */
	constructor(ctx, x, y, level = 1) {
		super(ctx, x, y, level);

		this.speed = Math.min(10, level);
		this.health = Math.min(10, level);

		this.spriteFrame = this.spriteData.getFrame(this.getFrameName());

		//this.radius = 20;
		this.width = 40;
		this.height = (this.spriteFrame.frame.h * this.width) / this.spriteFrame.frame.w;

		this.hitBox = this.getShape();
	}

	getFrameName() {
		switch (this.level) {
			case 1:
				return "enemy-scout";
			case 2:
			case 3:
			case 4:
				return `enemy-drone-${this.level - 1}`;
			default:
				return "enemy-drone-4";
		}
	}

	/**
	 * @param {any} elapsedTime
	 */
	update(elapsedTime) {
		super.update(elapsedTime);
		if (!this.isAlive) return;

		this.x -= this.xOffset * this.speed;
		this.y -= this.yOffset * this.speed;
	}
}
