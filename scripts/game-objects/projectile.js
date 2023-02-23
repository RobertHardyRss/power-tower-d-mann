//@ts-check

export class Projectile {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 * @param {number} tx
	 * @param {number} ty
	 * @param {number} angle
	 */
	constructor(ctx, sx, sy, tx, ty, angle) {
		this.ctx = ctx;
		const dx = sx - tx;
		const dy = sy - ty;
		this.distance = Math.hypot(dx, dy);

		this.damage = 10;

		this.distanceTraveled = 0;

		this.xOffset = Math.cos(angle);
		this.yOffset = Math.sin(angle);

		this.x = sx;
		this.y = sy;
		this.isVisible = true;
		this.speed = 5;
	}

	update(elapsedTime) {
		if (this.distanceTraveled >= this.distance) {
			this.isVisible = false;
			return;
		}
		this.distanceTraveled = this.distanceTraveled + this.speed;
		this.x -= this.xOffset * this.speed;
		this.y -= this.yOffset * this.speed;
	}

	draw() {
		if (!this.isVisible) return;

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
		this.ctx.fillStyle = "red";
		this.ctx.fill();
		this.ctx.restore();
	}
}
