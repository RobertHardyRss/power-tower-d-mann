//@ts-check

import { ctx } from "../utility/canvas.js";

class BackGroundImage {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {HTMLImageElement} image
	 */
	constructor(ctx, image) {
		this.ctx = ctx;
		this.x = 0;
		this.y = 0;
		this.scrollRate = 1;
		this.image = image;
	}

	update(elapsedTime) {
		this.x -= this.scrollRate;
		if (this.x <= -this.image.width) {
			this.x = 0;
		}
	}

	draw() {
		this.ctx.save();
		this.ctx.translate(0, 0);
		this.ctx.drawImage(this.image, this.x, this.y);
		this.ctx.drawImage(this.image, this.x + this.image.width, this.y);
		this.ctx.drawImage(this.image, this.x + this.image.width * 2, this.y);
	}
}

/** @type {HTMLImageElement} */ //@ts-ignore
const starFieldImage = document.getElementById("background-space");

const starFieldBackground = new BackGroundImage(ctx, starFieldImage);

export { starFieldBackground };