//@ts-check
<<<<<<< HEAD
import { Projectile } from "./projectiles.js";
import { Enemy } from "./Enemy.js";
=======

import { Projectile } from "./projectile.js";
import { Enemy } from "./enemy.js";
import { playerSpriteSheet } from "../utility/sprite-sheet.js";

>>>>>>> origin/robert
export class Turret {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 */
	constructor(ctx, sx, sy) {
		this.x = sx;
		this.y = sy;
		this.ctx = ctx;
		this.color = "white";
		this.angle = 0;
		this.rotateRate = 0.08
		this.accuracy = 0.5
		this.range = 200;
		/**@type {Enemy[]} */
		this.targets = [];
		/** @type { Enemy | null } */
		this.target = null;
		/** @type { Projectile[] } */
		this.projectiles = [];
		this.rateOfFire = 100; // milliseconds
		this.lastFireTime = 0;
<<<<<<< HEAD
		this.targetAngle = 0
=======

		this.image = playerSpriteSheet.image;
		this.turretSpriteFrame = playerSpriteSheet.getFrame(
			"turret-point-defense"
		);
		this.width = 31;
		this.height = 20;
>>>>>>> origin/robert
	}

	acquireTarget() {
		if (this.target != null) {
			if (this.getDistanceToTarget(this.target) > this.range || !this.target.isAlive) {
				this.target = null;
				this.projectiles = [];
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
		let distance = Math.sqrt(dx * dx + dy * dy) - target.radius;
		return distance;
	}

	update(elapsedTime) {
		this.acquireTarget();

		this.projectiles.forEach((p) => {
			p.update();
		});

		this.projectiles = this.projectiles.filter((p) => p.isVisible);

		if (this.target == null) return;

		this.lastFireTime += elapsedTime;

			if (this.lastFireTime >= this.rateOfFire) {
				this.lastFireTime = 0;
				this.projectiles.push(
					new Projectile(
						this.ctx,
						this.x,
						this.y,
						this.target.x,
						this.target.y,
						this.angle
					)
				);
			}
		

		let dx = this.x - this.target.x;
		let dy = this.y - this.target.y;
		this.targetAngle = Math.atan2(dy, dx);
		let diff = ( this.targetAngle - this.angle) % 360
		if (diff > 180){
			diff = -(360 - diff)
		}
		this.angle +=  this.rotateRate * diff


<<<<<<< HEAD

=======
		const P2 = Math.PI * 2;
		return (this.angle - this.targetAngle + P2) % P2 > Math.PI ? 1 : -1;
>>>>>>> origin/robert
	}

	draw() {
		this.projectiles.forEach((p) => {
			p.draw();
		});

<<<<<<< HEAD
		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
		this.ctx.fillStyle = "hsla(0, 100%, 50%, 0.5)";
		this.ctx.fill();
		this.ctx.restore();
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);
		this.ctx.beginPath();
		this.ctx.moveTo(-10, 0);
		this.ctx.lineTo(10, -5);
		this.ctx.lineTo(10, 5);
		this.ctx.lineTo(-10, 0);
		this.ctx.fillStyle = this.color;
		this.ctx.fill();
		this.ctx.restore();
	}
}
=======
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
>>>>>>> origin/robert
