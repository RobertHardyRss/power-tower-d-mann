//@ts-check

import { Projectile } from "./projectile.js";
import { Enemy } from "./enemy.js";
import { playerSpriteSheet } from "../utility/sprite-sheet.js";
import { TURRET_UPGRADES, TURRET_UPGRADE_BASE_COST } from "../utility/constants.js";
import { EVENTS, ToggleUpgradeUiEvent, TurretUpgradeEvent } from "../utility/events.js";

/**
 * @callback applyTurretUpgradeCallback
 */

class TurretUpgrade {
	/**
	 * @param {string} description
	 * @param {applyTurretUpgradeCallback} upgradeCallback
	 */
	constructor(description, upgradeCallback) {
		this.description = description;
		this.currentLevel = 0;
		this.maxLevel = 8;
		this.baseCost = 2;
		this.callback = upgradeCallback;
	}

	costToUpgrade() {
		// cost is exponential
		return Math.ceil(this.baseCost ** (this.currentLevel + 1));
	}

	isMaxed() {
		return this.currentLevel === this.maxLevel;
	}

	apply() {
		if (this.currentLevel < this.maxLevel) {
			this.currentLevel++;
		}
		// execute the callback which will handle applying the upgrade
		// to the turret
		this.callback();
	}
}

class TurretUpgradeDamage extends TurretUpgrade {
	/**
	 * @param {applyTurretUpgradeCallback} upgradeCallback
	 */
	constructor(upgradeCallback) {
		super(TURRET_UPGRADES.damage, upgradeCallback);
		this.baseCost = TURRET_UPGRADE_BASE_COST.damage;
	}
}

class TurretUpgradeHealth extends TurretUpgrade {
	/**
	 * @param {applyTurretUpgradeCallback} upgradeCallback
	 */
	constructor(upgradeCallback) {
		super(TURRET_UPGRADES.health, upgradeCallback);
		this.baseCost = TURRET_UPGRADE_BASE_COST.health;
	}
}

class TurretUpgradeRange extends TurretUpgrade {
	/**
	 * @param {applyTurretUpgradeCallback} upgradeCallback
	 */
	constructor(upgradeCallback) {
		super(TURRET_UPGRADES.range, upgradeCallback);
		this.baseCost = TURRET_UPGRADE_BASE_COST.range;
	}
}

class TurretUpgradeRateOfFire extends TurretUpgrade {
	/**
	 * @param {applyTurretUpgradeCallback} upgradeCallback
	 */
	constructor(upgradeCallback) {
		super(TURRET_UPGRADES.rateOfFire, upgradeCallback);
		this.baseCost = TURRET_UPGRADE_BASE_COST.rateOfFire;
	}
}

class TurretUpgradeTargetingSpeed extends TurretUpgrade {
	/**
	 * @param {applyTurretUpgradeCallback} upgradeCallback
	 */
	constructor(upgradeCallback) {
		super(TURRET_UPGRADES.targetingSpeed, upgradeCallback);
		this.baseCost = TURRET_UPGRADE_BASE_COST.targetingSpeed;
	}
}

export class Turret {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} sx
	 * @param {number} sy
	 */
	constructor(ctx, sx, sy) {
		this.ctx = ctx;
		this.x = sx;
		this.y = sy;
		this.size = 32;
		this.type = "turret";
		this.name = "no name";

		this.angle = 0;
		this.targetAngle = 0;
		this.angleDiff = 0; // this is the difference between our target angle and current
		this.angleTolerance = 0.1;

		// upgradeable stats
		this.rotationRate = 0.01;
		this.range = 100;
		this.rateOfFire = 1000; // milliseconds
		this.projectileDamage = 1;
		this.health = 100;

		/** @type {TurretUpgrade[]} */
		this.upgrades = [
			new TurretUpgradeDamage(this.upgradeDamage.bind(this)),
			new TurretUpgradeHealth(this.upgradeHealth.bind(this)),
			new TurretUpgradeRange(this.upgradeRange.bind(this)),
			new TurretUpgradeRateOfFire(this.upgradeRateOfFire.bind(this)),
			new TurretUpgradeTargetingSpeed(this.upgradeTargetingSpeed.bind(this)),
		];

		// this will get toggled when we show the upgrade UI
		this.showRange = false;

		/** @type {Enemy[]} */
		this.targets = [];
		/** @type { Enemy | null } */
		this.target = null;

		/** @type { Projectile[] } */
		this.projectiles = [];
		this.lastFireTime = 0;

		this.image = playerSpriteSheet.image;
		this.turretSpriteFrame = playerSpriteSheet.getFrame("turret-point-defense");
		this.width = 31;
		this.height = 20;

		this.wireUpEvents();
	}

	upgradeDamage() {
		this.projectileDamage += Math.ceil(this.projectileDamage * 0.1);
	}

	upgradeHealth() {
		this.health += Math.ceil(this.health * 0.1);
	}

	upgradeRange() {
		this.range += Math.ceil(this.range * 0.2);
	}

	upgradeRateOfFire() {
		this.rateOfFire = Math.max(50, Math.floor(this.rateOfFire - this.rateOfFire * 0.1));
	}

	upgradeTargetingSpeed() {
		this.rotationRate += this.rotationRate * 0.1;
	}

	acquireTarget() {
		// if my current target is out of range, set target to null
		// if I already have a target return
		if (this.target != null) {
			if (!this.target.isAlive || this.getDistanceToTarget(this.target) > this.range) {
				this.target = null;
				// this.projectiles = [];
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
		let distance = Math.hypot(dx, dy);
		return distance;
	}

	update(elapsedTime) {
		this.acquireTarget();

		this.projectiles.forEach((p) => {
			p.update();
		});

		// filter out projectiles that are no longer visible
		this.projectiles = this.projectiles.filter((p) => p.isVisible);

		if (this.target == null) return;

		this.lastFireTime += elapsedTime;

		if (this.lastFireTime >= this.rateOfFire && Math.abs(this.angleDiff) <= this.angleTolerance) {
			this.lastFireTime = 0;
			this.projectiles.push(new Projectile(this.ctx, this.x, this.y, this.range, this.angle));
		}

		let dx = this.x - this.target.x;
		let dy = this.y - this.target.y;
		this.targetAngle = Math.atan2(dy, dx);

		let rotationDirectionMultiplier = this.getRotationDirection();
		this.angle += this.rotationRate * rotationDirectionMultiplier;
		if (this.angle > Math.PI) {
			this.angle = -(Math.PI - (this.angle - Math.PI));
		} else if (this.angle < -Math.PI) {
			this.angle = Math.PI - (-this.angle - Math.PI);
		}

		this.angle = Math.min(Math.max(this.angle, -Math.PI), Math.PI);
	}

	getRotationDirection() {
		this.angleDiff = Math.abs(this.angle + Math.PI - (this.targetAngle + Math.PI));

		const P2 = Math.PI * 2;
		return (this.angle - this.targetAngle + P2) % P2 > Math.PI ? 1 : -1;
	}

	draw() {
		this.projectiles.forEach((p) => {
			p.draw();
		});

		if (this.showRange) {
			// draw firing arc
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
			this.ctx.fillStyle = "hsla(0, 100%, 50%, 0.1)";
			this.ctx.fill();
			this.ctx.restore();
		}

		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);

		this.ctx.drawImage(
			this.image,
			this.turretSpriteFrame.frame.x, // sx
			this.turretSpriteFrame.frame.y, // sy
			this.turretSpriteFrame.frame.w, // sw
			this.turretSpriteFrame.frame.h, // sh
			-this.width * this.turretSpriteFrame.pivot.x, // dx
			-this.height * this.turretSpriteFrame.pivot.y, // dy
			this.width, // dw
			this.height // dh
		);

		this.ctx.restore();
	}

	/**
	 * @param {CustomEvent} event
	 */
	upgradeHandler(event) {
		/** @type {TurretUpgradeEvent} */
		// Get the upgrade details from the event
		const upgradeDetail = event.detail;

		console.log("Turret received upgrade event", upgradeDetail);

		// if the name from the event doesn't match my name, return.
		if (upgradeDetail.name != this.name) return;

		// find the upgrade based on the description and make sure it is not maxed
		const upgrade = this.upgrades.find((u) => u.description === upgradeDetail.description);
		if (!upgrade || upgrade.isMaxed()) return;

		// upgrade is valid, so go ahead and apply it
		upgrade.apply();

		// notify others that the upgrade has been completed
		const upgradedEvent = new CustomEvent(EVENTS.upgradeComplete, {
			detail: { upgrade: upgradeDetail },
		});
		document.dispatchEvent(upgradedEvent);
	}

	/**
	 * @param {CustomEvent} event
	 */
	toggleUiHandler(event) {
		/** @type {ToggleUpgradeUiEvent} */
		// Get the toggle details from the event
		const toggle = event.detail;
		this.showRange = toggle.show;
	}

	wireUpEvents() {
		// listen for upgrade events and call my upgrade handler
		document.addEventListener(EVENTS.upgrade, this.upgradeHandler.bind(this));
		// listen for UI toggle events so we can show our firing radius
		document.addEventListener(EVENTS.toggleUpgradeUi, this.toggleUiHandler.bind(this));
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
		this.size = 32;
		this.type = "Point Defense";
		this.name = name;

		// upgradeable stats
		this.rotationRate = 0.05;
		this.range = 75;
		this.rateOfFire = 250; // milliseconds
		this.projectileDamage = 1;
		this.health = 100;
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

		// upgradeable stats
		this.rotationRate = 0.02;
		this.range = 200;
		this.rateOfFire = 500; // milliseconds
		this.projectileDamage = 50;
		this.health = 500;

		this.angle = angle;
		this.size = 64;
		this.type = "Main";
		this.name = name;

		this.turretSpriteFrame = playerSpriteSheet.getFrame("turret-main-forward");
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
