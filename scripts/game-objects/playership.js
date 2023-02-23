//@ts-check

import { MainTurret, PointDefenseTurret } from "./turret.js";

export class PlayerShip {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(ctx) {
		this.ctx = ctx;
		this.shipPath = this.getShipPath();
		this.turrets = [
			new PointDefenseTurret(ctx, 75, -50, "Front Port", Math.PI / 2),
			new PointDefenseTurret(ctx, -75, -50, "Stern Port", Math.PI / 2),
			new PointDefenseTurret(
				ctx,
				75,
				50,
				"Front Starboard",
				Math.PI * 1.5
			),
			new PointDefenseTurret(
				ctx,
				-75,
				50,
				"Stern Starboard",
				Math.PI * 1.5
			),
			new MainTurret(ctx, 75, 0, "Main Front", Math.PI),
			new MainTurret(ctx, -75, 0, "Main Stern", 0),
		];
	}

	getShipPath() {
		let shipPath = new Path2D();
		shipPath.moveTo(150, -15);
		shipPath.lineTo(135, -35);
		shipPath.lineTo(120, -25);
		shipPath.lineTo(105, -50);
		shipPath.arc(75, -50, 16, 0, Math.PI, true);
		shipPath.lineTo(45, -50);
		shipPath.lineTo(30, -20);
		shipPath.lineTo(0, -30);
		shipPath.lineTo(-30, -30);
		shipPath.lineTo(-50, -50);
		shipPath.arc(-75, -50, 16, 0, Math.PI, true);
		shipPath.lineTo(-100, -50);
		shipPath.lineTo(-120, -25);
		shipPath.lineTo(-150, -15);
		shipPath.lineTo(-150, 15);
		shipPath.lineTo(-120, 25);
		shipPath.lineTo(-100, 50);
		shipPath.arc(-75, 50, 16, Math.PI, 0, true);
		shipPath.lineTo(-50, 50);
		shipPath.lineTo(-30, 30);
		shipPath.lineTo(0, 30);
		shipPath.lineTo(30, 20);
		shipPath.lineTo(45, 50);
		shipPath.arc(75, 50, 16, Math.PI, 0, true);
		shipPath.lineTo(105, 50);
		shipPath.lineTo(120, 25);
		shipPath.lineTo(135, 35);
		shipPath.lineTo(150, 15);
		shipPath.closePath();
		return shipPath;
	}

	/**
	 * @param {number} elapsedTime
	 */
	update(elapsedTime) {
		this.turrets.forEach((t) => {
			t.update(elapsedTime);
		});
	}

	draw() {
		this.ctx.save();
		this.ctx.fillStyle = "silver";
		this.ctx.strokeStyle = "black";
		this.ctx.fill(this.shipPath);
		this.ctx.stroke(this.shipPath);
		this.ctx.restore();

		this.turrets.forEach((t) => {
			t.draw();
		});
	}
}