//@ts-check
import uiSpriteData from "../../assets/ui/sprite-sheet.json" assert { type: "json" };
import { ctx } from "../utility/canvas.js";

class UiSpriteSheet {
	constructor() {
		this.data = uiSpriteData;

		/** @type {HTMLImageElement} */ //@ts-ignore
		this.image = document.getElementById("sprite-sheet-ui");
	}

	/**
	 * @param {string} name
	 * @returns {{ name: string; x: number; y: number, width: number; height: number }[]}
	 */
	getFrames(name) {
		const frames = this.data.frames.filter((f) => f.name.startsWith(name));
		return frames;
	}

	/**
	 * @param {string} name
	 * @returns {{ name: string; x: number; y: number, width: number; height: number }}
	 */
	getFrame(name) {
		return this.getFrames(name)[0];
	}
}

const spriteSheet = new UiSpriteSheet();

class Panel {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 * @param {number[]} radii
	 */
	constructor(ctx, x, y, width, height, radii = [10]) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;
		this.r = radii;

		this.hue = 200;
		this.saturation = 80;
		this.lightness = 50;
		this.alpha = 0.8;
	}

	draw() {
		const lineWidth = 1;
		this.ctx.save();
		this.ctx.beginPath();

		this.ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
		this.ctx.strokeStyle = `hsla(${this.hue}, ${this.saturation}%, ${Math.max(this.lightness - 40, 0)}%, ${
			this.alpha
		})`;
		this.ctx.roundRect(this.x, this.y, this.w, this.h, this.r);
		this.ctx.fill();
		this.ctx.lineWidth = lineWidth;
		this.ctx.stroke();

		this.ctx.strokeStyle = "hsla(0, 0%, 100%, 0.5)";
		this.ctx.roundRect(
			this.x + lineWidth,
			this.y + lineWidth,
			this.w - lineWidth * 2,
			this.h - lineWidth * 2,
			this.r
		);
		this.ctx.stroke();

		this.ctx.restore();
	}
}

const mainAftpnl = new Panel(ctx, 20, -50, 200, 100);

export const panels = [mainAftpnl];
