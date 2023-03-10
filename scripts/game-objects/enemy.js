//@ts-check

import { enemySprite, miscSprite } from "../utility/sprite-sheet.js";
import { canvas, normalizePoint } from "../utility/canvas.js";
import { PlayerShip } from "./player-ship.js";
import { Explosion } from "./explosion.js";
import { EVENTS } from "../utility/events.js";

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

		this.turretTargetX = x;
		this.turretTargetY = y;

		this.angle = Math.atan2(this.y, this.x);
		this.xOffset = Math.cos(this.angle);
		this.yOffset = Math.sin(this.angle);

		this.level = level;
		this.speed = 1;
		this.health = 1;
		this.isAlive = true;
		this.bountyAmount = 1;
		this.baseDamage = 1;

		this.width = 200;
		this.height = 150;
		// this.radius = 100;

		this.spriteData = enemySprite;
		this.image = enemySprite.image;
		this.spriteFrame = this.spriteData.getFrame("enemy-scout");
		this.animationImage = miscSprite.image;
		this.animationSpriteData = miscSprite;
		this.frameRate = 1000 / 12; // 12 fps
		this.frameTime = 0;
		this.exhaustSprites = this.animationSpriteData.getFrames("red/");
		this.exhaustFrame = 0;
		this.exhaustFrameCount = this.exhaustSprites.length;

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
			document.dispatchEvent(new CustomEvent(EVENTS.creditChange, { detail: this.bountyAmount }));
			document.dispatchEvent(new Event(EVENTS.enemyDeath));
		}

		this.frameTime += elapsedTime;

		if (this.frameTime >= this.frameRate) {
			this.frameTime = 0;
			this.exhaustFrame++;
			if (this.exhaustFrame === this.exhaustFrameCount) {
				this.exhaustFrame = 0;
			}
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
			this.animationImage,
			this.exhaustSprites[this.exhaustFrame].frame.x, // sx
			this.exhaustSprites[this.exhaustFrame].frame.y, // sy
			this.exhaustSprites[this.exhaustFrame].frame.w, // sw
			this.exhaustSprites[this.exhaustFrame].frame.h, // sh
			this.width * 2 * this.exhaustSprites[this.exhaustFrame].pivot.x, // dx
			-(this.height / 2) * this.exhaustSprites[this.exhaustFrame].pivot.y, // dy
			this.width / 2, // dw
			this.height / 2 // dh
		);

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

		this.ctx.restore();
	}

	/**
	 * @param {PlayerShip} player
	 */
	playerCollisionCheck(player) {
		if (this.ctx.isPointInPath(player.shipPath, this.x, this.y)) {
			// hit the player
			this.health = 0;
			document.dispatchEvent(new CustomEvent(EVENTS.playerHealthChange, { detail: -this.baseDamage }));
		}
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

		this.speed = Math.min(3, level);
		this.health = Math.min(50, level * 2);
		this.baseDamage = level;
		this.bountyAmount = this.health;

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

		this.turretTargetX = this.x - this.xOffset * (this.width / 2);
		this.turretTargetY = this.y - this.yOffset * (this.height / 2);
	}
}

export class CircleDrone extends Enemy {
	constructor(ctx, x, y, level = 1) {
		super(ctx, x, y, level);
		this.centerX = -this.xOffset;
		this.centerY = -this.yOffset;
		this.radius = 1200;
		this.targetx = this.centerX + this.radius * Math.cos(this.x);
		this.targety = this.centerY + this.radius * Math.sin(this.y);
		this.num = Math.random() * 360;
		(this.x = this.radius * Math.cos(this.num)), (this.y = this.radius * Math.sin(this.num));
		this.speed = Math.min(3, level);
		this.health = Math.min(10, level);
		this.bountyAmount = this.health;
		this.angle = Math.atan2(this.targetx, this.targety);
		this.spriteFrame = this.spriteData.getFrame(this.getFrameName());
		this.gradientofRad = -1 / ((this.centerY - this.y) / (this.centerX - this.x));
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
				return `enemy-light-figther-${this.level - 1}`;
			default:
				return "enemy-light-figther-4";
		}
	}

	/**
	 * @param {any} elapsedTime
	 */
	update(elapsedTime) {
		super.update(elapsedTime);
		if (!this.isAlive) return;
		if (this.num < 360) this.num += this.speed / 360;
		else this.num = 0;
		this.radius -= this.speed / 2;
		this.x = this.centerX + this.radius * Math.cos(this.num);
		this.y = this.centerY + this.radius * Math.sin(this.num);

		this.turretTargetX = this.x - this.xOffset * (this.width / 2);
		this.turretTargetY = this.y - this.yOffset * (this.height / 2);

		this.angle = this.num - 1.4;
	}
}
