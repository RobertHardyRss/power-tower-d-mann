//@ts-check

import { playerSpriteSheet } from "../utility/sprite-sheet.js";
import { MainTurretAlt, MainTurret, PointDefenseTurret } from "./turret.js";
import { miscSprite } from "../utility/sprite-sheet.js";

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
			new PointDefenseTurret(ctx, 75, 50, "Front Starboard", Math.PI * 1.5),
			new PointDefenseTurret(ctx, -75, 50, "Stern Starboard", Math.PI * 1.5),
			new MainTurret(ctx, 75, 0, "Main Front", Math.PI),
			new MainTurretAlt(ctx, -75, 0, "Main Stern", 0),
		];

		const sprites = playerSpriteSheet;
		this.width = 316;
		this.height = 131;
		this.image = playerSpriteSheet.image;
		this.shipSpriteFrame = sprites.getFrame("main-ship");

		this.animationImage = miscSprite.image;
		this.animationSpriteData = miscSprite;
		this.frameRate = 1000 / 12; // 12 fps
		this.frameTime = 0;
		this.exhaustSprites = this.animationSpriteData.getFrames("blue/");
		this.exhaustFrameEng1 = 0;
		this.exhaustFrameEng2 = Math.floor(this.exhaustSprites.length / 2);
		this.exhaustFrameCount = this.exhaustSprites.length;

		// this.image2 = miscSprite.image
		// this.mSprites = miscSprite
		// this.timagnum1 = 1
		// this.timagnum2 = 3
		// this.thrusterSprite1 =  this.mSprites.getFrame("blue/frame-0"+ String(this.timagnum1)+".png");
		// this.thrusterSprite2 =  this.mSprites.getFrame("blue/frame-0"+ String(this.timagnum2)+".png");
		// this.time1 = 5
		// this.time2 = 4
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

		this.frameTime += elapsedTime;

		if (this.frameTime >= this.frameRate) {
			this.frameTime = 0;
			this.exhaustFrameEng1++;
			this.exhaustFrameEng2++;
			if (this.exhaustFrameEng1 === this.exhaustFrameCount) {
				this.exhaustFrameEng1 = 0;
			}
			if (this.exhaustFrameEng2 === this.exhaustFrameCount) {
				this.exhaustFrameEng2 = 0;
			}
		}
	}

	draw() {
		this.ctx.save();

		this.ctx.rotate(Math.PI);
		this.ctx.drawImage(
			this.animationImage,
			this.exhaustSprites[this.exhaustFrameEng1].frame.x, // sx
			this.exhaustSprites[this.exhaustFrameEng1].frame.y, // sy
			this.exhaustSprites[this.exhaustFrameEng1].frame.w, // sw
			this.exhaustSprites[this.exhaustFrameEng1].frame.h, // sh
			this.width * this.exhaustSprites[this.exhaustFrameEng1].pivot.x + 55, // dx
			-(this.height / 2) * this.exhaustSprites[this.exhaustFrameEng1].pivot.y + 20, // dy
			this.width * 0.33, // dw
			this.height * 0.33 // dh
		);

		this.ctx.drawImage(
			this.animationImage,
			this.exhaustSprites[this.exhaustFrameEng2].frame.x, // sx
			this.exhaustSprites[this.exhaustFrameEng2].frame.y, // sy
			this.exhaustSprites[this.exhaustFrameEng2].frame.w, // sw
			this.exhaustSprites[this.exhaustFrameEng2].frame.h, // sh
			this.width * this.exhaustSprites[this.exhaustFrameEng2].pivot.x + 55, // dx
			-(this.height / 2) * this.exhaustSprites[this.exhaustFrameEng2].pivot.y + 3, // dy
			this.width * 0.33, // dw
			this.height * 0.33 // dh
		);
		this.ctx.restore();

		this.ctx.save();
		this.ctx.drawImage(
			this.image,
			this.shipSpriteFrame.frame.x, // image starting x
			this.shipSpriteFrame.frame.y, // image starting y
			this.shipSpriteFrame.frame.w, // image starting width
			this.shipSpriteFrame.frame.h, // image starting height
			-this.width * this.shipSpriteFrame.pivot.x, // x to place image
			-this.height * this.shipSpriteFrame.pivot.y, // y to place image
			this.width, // placement width
			this.height // placement height
		);
		// this.ctx.restore();
		// this.ctx.save()
		// this.ctx.drawImage(
		// 	this.image2,
		// 	this.thrusterSprite1.frame.x,
		// 	this.thrusterSprite1.frame.y,
		// 	this.thrusterSprite1.frame.w,
		// 	this.thrusterSprite1.frame.h,
		// 	-210,
		// 	-34,
		// 	75,
		// 	50,
		// )
		// this.ctx.restore()
		// this.ctx.save()
		// this.ctx.drawImage(
		// 	this.image2,
		// 	this.thrusterSprite2.frame.x,
		// 	this.thrusterSprite2.frame.y,
		// 	this.thrusterSprite2.frame.w,
		// 	this.thrusterSprite2.frame.h,
		// 	-210,
		// 	-17,
		// 	75,
		// 	50,
		// )
		this.ctx.restore();

		this.turrets.forEach((t) => {
			t.draw();
		});
	}
}
