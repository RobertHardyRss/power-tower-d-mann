//@ts-check

import { Projectile } from "./projectile.js";
import { Enemy } from "./enemy.js";
import { playerSpriteSheet } from "../utility/sprite-sheet.js";

export class Turret {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 */
	constructor(ctx, sx, sy) {
		this.ctx = ctx;
		this.x = sx;
		this.y = sy;
		this.size = 32;
		this.type = "turret";
		this.name = "no name";

		this.color = "black";
		this.angle = 0;
		this.targetAngle = 0;
		this.angleDiff = 0; // this is the difference between our target angle and current

		this.rotationRate = 0.05;
		this.angleTolerance = 0.1;

		this.range = 300;
		/** @type {Enemy[]} */
		this.targets = [];
		/** @type { Enemy | null } */
		this.target = null;

		/** @type { Projectile[] } */
		this.projectiles = [];
		this.rateOfFire = 250; // milliseconds
		this.lastFireTime = 0;

		this.image = playerSpriteSheet.image;
		this.turretSpriteFrame = playerSpriteSheet.getFrame(
			"turret-point-defense"
		);
		this.width = 31;
		this.height = 20;
	}

	acquireTarget() {
		// if my current target is out of range, set target to null
		// if I already have a target return
		if (this.target != null) {
			if (
				!this.target.isAlive ||
				this.getDistanceToTarget(this.target) > this.range
			) {
				this.target = null;
				// this.projectiles = [];
				return;
			}
		}

		// if targets are within my range, target the closest
		this.targets.forEach((t) => {
			if (this.getDistanceToTarget(t) <= this.range) {
				this.target = t;
			}
		});
	}

	getDistanceToTarget(target) {
		// if we don't have a target make the distance as big
		// as possible (WAY out of range)
		if (target == null) return Number.MAX_VALUE;

		let dx = this.x - target.x;
		let dy = this.y - target.y;
		let distance = Math.hypot(dx, dy);
		return distance;
	}

	update(elapsedTime) {
		this.acquireTarget();

		this.projectiles.forEach((p) => {
			p.update();
		});

		// filter out projectiles that are no longer visible
		this.projectiles = this.projectiles.filter((p) => p.isVisible);

		if (this.target == null) return;

		this.lastFireTime += elapsedTime;

		if (
			this.lastFireTime >= this.rateOfFire &&
			Math.abs(this.angleDiff) <= this.angleTolerance
		) {
			this.lastFireTime = 0;
			this.projectiles.push(
				new Projectile(this.ctx, this.x, this.y, this.range, this.angle)
			);
		}

		let dx = this.x - this.target.x;
		let dy = this.y - this.target.y;
		this.targetAngle = Math.atan2(dy, dx);

		let rotationDirectionMultiplier = this.getRotationDirection();
		this.angle += this.rotationRate * rotationDirectionMultiplier;
		if (this.angle > Math.PI) {
			this.angle = -(Math.PI - (this.angle - Math.PI));
		} else if (this.angle < -Math.PI) {
			this.angle = Math.PI - (-this.angle - Math.PI);
		}

		this.angle = Math.min(Math.max(this.angle, -Math.PI), Math.PI);
	}

	getRotationDirection() {
		this.angleDiff = Math.abs(
			this.angle + Math.PI - (this.targetAngle + Math.PI)
		);

		const P2 = Math.PI * 2;
		return (this.angle - this.targetAngle + P2) % P2 > Math.PI ? 1 : -1;
	}

	draw() {
		this.projectiles.forEach((p) => {
			p.draw();
		});

		// draw firing arc
		// this.ctx.save();
		// this.ctx.beginPath();
		// this.ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
		// this.ctx.fillStyle = "hsla(0, 100%, 50%, 0.1)";
		// this.ctx.fill();
		// this.ctx.restore();

		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);

		this.ctx.drawImage(
			this.image,
			this.turretSpriteFrame.frame.x, // sx
			this.turretSpriteFrame.frame.y, // sy
			this.turretSpriteFrame.sourceSize.w, // sw
			this.turretSpriteFrame.sourceSize.h, // sh
			-this.width * this.turretSpriteFrame.pivot.x, // dx
			-this.height * this.turretSpriteFrame.pivot.y, // dy
			this.width, // dw
			this.height // dh
		);

		this.ctx.restore();
	}
}

export class PointDefenseTurret extends Turret {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 * @param {string} name
	 * @param {number} angle
	 */
	constructor(ctx, sx, sy, name, angle) {
		super(ctx, sx, sy);

		this.angle = angle;
		this.color = "black";
		this.range = 75;
		this.size = 32;
		this.type = "Point Defense";
		this.name = name;
	}
}

export class MainTurret extends Turret {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 * @param {string} name
	 * @param {number} angle
	 */
	constructor(ctx, sx, sy, name, angle) {
		super(ctx, sx, sy);

		this.angle = angle;
		this.color = "purple";
		this.range = 200;
		this.size = 64;
		this.type = "Main";
		this.name = name;

		this.turretSpriteFrame = playerSpriteSheet.getFrame(
			"turret-main-forward"
		);
		this.width = 47;
		this.height = 32;
	}
}

export class MainTurretAlt extends MainTurret {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 * @param {string} name
	 * @param {number} angle
	 */
	constructor(ctx, sx, sy, name, angle) {
		super(ctx, sx, sy, name, angle);
		this.turretSpriteFrame = playerSpriteSheet.getFrame("turret-main-aft");
		this.width = 58;
		this.height = 32;
	}
}
