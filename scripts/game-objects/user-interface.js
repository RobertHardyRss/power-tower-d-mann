//@ts-check
import uiSpriteData from "../../assets/ui/sprite-sheet.json" assert { type: "json" };
import { canvas } from "../utility/canvas.js";
import { EVENTS, TurretUpgradeEvent } from "../utility/events.js";
import { Turret } from "./turret.js";

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

export class TurretUpgradePanel {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Turret} turret
	 */
	constructor(ctx, turret) {
		this.ctx = ctx;
		this.turret = turret;
		this.show = false;
		this.totalCredits = 0;

		this.text = {
			nameFontSize: 18,
			upgradeFontSize: 12,
			padLeft: 10,
			padTop: 12,
			panelPadTop: 20,
		};

		this.name = turret.name;
		this.isFocus = false;
		this.panel = this.buildPanel();

		/** @type {number[]} */
		this.upgradeHoverCoords = [];
		this.upgradeHoverIndex = -1;
		this.setUpgradeHoverCoords();

		this.wireUpEvents();
	}

	buildPanel() {
		const width = 300;
		const xPadding = 50;
		// base the height on the text in the panel
		const height =
			this.text.panelPadTop +
			this.text.nameFontSize +
			this.turret.upgrades.length * (this.text.upgradeFontSize + this.text.padTop);
		const yPadding = 50;

		const isOnLeft = this.turret.x < 0;
		const isOnTop = this.turret.y > 0;

		if (this.turret.y == 0) {
			return new Panel(
				this.ctx,
				isOnLeft ? xPadding : canvas.width - (width + xPadding),
				canvas.height / 2 - height / 2,
				width,
				height
			);
		}

		return new Panel(
			this.ctx,
			isOnLeft ? xPadding : canvas.width - (width + xPadding),
			isOnTop ? yPadding : canvas.height - (height + yPadding),
			width,
			height
		);
	}

	setUpgradeHoverCoords() {
		const start = this.panel.y + this.text.nameFontSize + this.text.panelPadTop;
		for (
			let i = start, u = 0;
			u < this.turret.upgrades.length;
			u++, i += this.text.upgradeFontSize + this.text.padTop
		) {
			this.upgradeHoverCoords.push(i);
		}
	}
	/**
	 * @param {CustomEvent} event
	 */
	handleShowToggle(event) {
		this.show = event.detail.show;
	}

	/**
	 * @param {CustomEvent} event
	 */
	handleCreditChanged(event) {
		this.totalCredits += event.detail.amount;
	}

	/**
	 * @param {MouseEvent} event
	 */
	handleMouseOver(event) {
		this.isFocus = false;
		this.upgradeHoverIndex = -1;

		if (!this.show) return;

		const x = event.offsetX;
		const y = event.offsetY;

		if (x < this.panel.x || x > this.panel.x + this.panel.w) return;
		if (y < this.panel.y || y > this.panel.y + this.panel.h) return;

		this.isFocus = true;
		// determine if we are over an upgrade
		if (y < this.upgradeHoverCoords[0]) {
			this.upgradeHoverIndex = -1;
		} else {
			for (let i = this.upgradeHoverCoords.length - 1; i >= 0; i--) {
				if (this.upgradeHoverCoords[i] < y) {
					this.upgradeHoverIndex = i;
					break;
				}
			}
		}
	}

	handleMouseClick() {
		if (!this.isFocus || this.upgradeHoverIndex === -1) return;

		const upgradeEvent = new CustomEvent(EVENTS.upgrade, {
			detail: new TurretUpgradeEvent(this.name, this.turret.upgrades[this.upgradeHoverIndex].description),
		});

		document.dispatchEvent(upgradeEvent);

		console.log("clicked", this.turret.upgrades[this.upgradeHoverIndex]);
	}

	wireUpEvents() {
		document.addEventListener(EVENTS.toggleUpgradeUi, this.handleShowToggle.bind(this));
		document.addEventListener(EVENTS.creditChange, this.handleCreditChanged.bind(this));
		canvas.addEventListener("mousemove", this.handleMouseOver.bind(this));
		canvas.addEventListener("click", this.handleMouseClick.bind(this));
	}

	update() {}

	draw() {
		if (!this.show) return;

		this.panel.draw();
		const textX = this.panel.x + this.text.padLeft;
		let textY = this.panel.y + this.text.panelPadTop;

		this.ctx.save();
		this.ctx.font = `${this.text.nameFontSize}px kv-future`;
		this.ctx.fillStyle = "black";
		this.ctx.fillText(this.name, textX, textY);

		this.ctx.font = `${this.text.upgradeFontSize}px kv-future-thin`;
		textY += this.text.nameFontSize + this.text.padTop;
		this.turret.upgrades.forEach((u, i) => {
			if (i === this.upgradeHoverIndex) {
				this.ctx.fillStyle = "white";
			} else {
				this.ctx.fillStyle = "black";
			}

			this.ctx.textAlign = "left";
			this.ctx.fillText(u.description, textX, textY);
			this.ctx.textAlign = "right";
			this.ctx.fillText(`${u.costToUpgrade()} CR`, textX + (this.panel.w - this.text.padLeft * 2), textY);
			textY += this.text.upgradeFontSize + this.text.padTop;
		});
		this.ctx.restore();
	}
}
