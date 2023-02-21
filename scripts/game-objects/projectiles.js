//@ts-check
export class Projectile {
	/**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} sx
     * @param {number} sy
     * @param {number} tx
     * @param {number} [ty]
     */
	constructor(ctx, sx, sy, tx, ty, angle) {
		this.dx = sx - tx;
		// @ts-ignore
		this.dy = sy - ty;
		this.angle = angle
        this.ctx = ctx
		this.tx = tx;
		this.ty = ty;
		this.damage = 0
		this.distance = Math.hypot(this.dx, this.dy)
		this.distanceTraveled = 0;
        this.xOffest = Math.cos(this.angle)
        this.yOffest = Math.sin(this.angle)
		this.x = sx;
		this.y = sy;
		this.isVisible = true;
		this.speed = 20;
	}

	update(elapsedTime) {
		if (this.distanceTraveled >= this.distance) {
			this.isVisible = false;
			return;
		}
		this.distanceTraveled = this.distanceTraveled + this.speed;
		this.x -= this.xOffest * this.speed;
		this.y -= this.yOffest * this.speed;
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