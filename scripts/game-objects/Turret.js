//@ts-check
import { Projectile } from "./projectiles.js";
import { RoundThing } from "./Round-thing.js";
export class Turret {
	/**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} sx
     * @param {number} sy
     * @param {RoundThing[]} targets
     */
	constructor(ctx,sx, sy, targets) {
		this.x = sx;
		this.y = sy;
        this.ctx = ctx
		this.color = "black";
		this.angle = 0;

		this.range = 400;

		this.targets = targets;
		/** @type { RoundThing | null } */
		this.target = null;

		/** @type { Projectile[] } */
		this.projectiles = [];
		this.rateOfFire = 100; // milliseconds
		this.lastFireTime = 0;
	}

	acquireTarget() {
		// if my current target is out of range, set target to null
		// if I already have a target return
		if (this.target != null) {
			if (this.getDistanceToTarget(this.target) > this.range) {
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

       this.projectiles = this.projectiles.filter((p) => p.isVisible)

		if (this.target == null) return;

		this.lastFireTime += elapsedTime;

		if (this.lastFireTime >= this.rateOfFire) {
			this.lastFireTime = 0;
			this.projectiles.push(
				new Projectile(this.ctx,this.x, this.y, this.target.x, this.target.y)
			);
		}

		

		let dx = this.x - this.target.x;
		let dy = this.y - this.target.y;
		this.angle = Math.atan2(dy, dx);
	}

	draw() {
		this.projectiles.forEach((p) => {
			p.draw();
		});

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