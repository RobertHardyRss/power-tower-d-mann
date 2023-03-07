//@ts-check
import { miscSprite } from "../utility/sprite-sheet.js";

export class Projectile {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 * @param {number} range
	 * @param {number} angle
	 */
	constructor(ctx, sx, sy, range, angle) {
		this.ctx = ctx;
		this.distance = range;
		this.damage = 20;
		this.angle = angle
		this.distanceTraveled = 0;

		this.xOffset = Math.cos(angle);
		this.yOffset = Math.sin(angle);

		this.x = sx;
		this.y = sy;
		this.isVisible = true;
		this.speed = 5;
		this.width = 15
		this.height = 10
		this.image2 = miscSprite.image
		this.mSprites = miscSprite
		this.Sprite =  this.mSprites.getFrame("projectile.png");
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
		this.ctx.translate(this.x,this.y)
		this.ctx.rotate(this.angle)
		this.ctx.drawImage(
			this.image2,
			this.Sprite.frame.x,
			this.Sprite.frame.y,
			this.Sprite.frame.w,
			this.Sprite.frame.h,
			-this.width * this.Sprite.pivot.x, // dx
			-this.height * this.Sprite.pivot.y, // dy
			this.width,
			this.height,
		)
		this.ctx.restore();

	}
}
