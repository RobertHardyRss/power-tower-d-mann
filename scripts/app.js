//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

class Projectile {
	constructor(sx, sy, tx, ty) {
		this.dx = sx - tx;
		this.dy = sy - ty;
		this.tx = tx;
		this.ty = ty;
		this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
		this.distanceTraveled = 0;
		

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
		this.x -= this.dx / this.speed;
		this.y -= this.dy / this.speed;
	}

	draw() {
		if (!this.isVisible) return;

		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.restore();
	}
}

class Turret {
	/**
	 * @param {number} sx
	 * @param {number} sy
	 * @param {RoundThing[]} targets
	 */
	constructor(sx, sy, targets) {
		this.x = sx;
		this.y = sy;
		this.color = "black";
		this.angle = 0;

		this.range = 300;

		this.targets = targets;
		/** @type { RoundThing | null } */
		this.target = null;

		/** @type { Projectile[] } */
		this.projectiles = [];
		this.rateOfFire = 250; // milliseconds
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

		if (this.target == null) return;

		this.lastFireTime += elapsedTime;

		if (this.lastFireTime >= this.rateOfFire) {
			this.lastFireTime = 0;
			this.projectiles.push(
				new Projectile(this.x, this.y, this.target.x, this.target.y)
			);
		}

		this.projectiles.forEach((p) => {
			p.update();
		});

		let dx = this.x - this.target.x;
		let dy = this.y - this.target.y;
		this.angle = Math.atan2(dy, dx);
	}

	draw() {
		this.projectiles.forEach((p) => {
			p.draw();
		});

		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
		ctx.fillStyle = "hsla(0, 100%, 50%, 0.5)";
		ctx.fill();
		ctx.restore();

		ctx.save();

		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);

		ctx.beginPath();
		ctx.moveTo(-10, 0);
		ctx.lineTo(10, -5);
		ctx.lineTo(10, 5);
		ctx.lineTo(-10, 0);

		ctx.fillStyle = this.color;
		ctx.fill();

		ctx.restore();
	}
}

class RoundThing {
	constructor() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.xDirection = 1;
		this.yDirection = 1;
		this.color = "black";
		this.radius = 16;
		this.lastDirectionChange = 0;
		this.changeInterval = Math.random() * 750 + 250;
		this.setRandomDirection();
		this.setRandomColor();
	}

	getRandomDirection() {
		return Math.random() > 0.5 ? 1 : -1;
	}

	setRandomDirection() {
		this.xDirection = this.getRandomDirection();
		this.yDirection = this.getRandomDirection();
	}

	setRandomColor() {
		let hue = Math.floor(Math.random() * 360);
		let hsl = `hsl(${hue}, 100%, 50%)`;
		this.color = hsl;
	}

	update(elapsedTime) {
		this.lastDirectionChange += elapsedTime;

		if (this.lastDirectionChange >= this.changeInterval) {
			this.lastDirectionChange = 0;
			this.setRandomDirection();
		}

		this.x += this.xDirection;
		this.y += this.yDirection;
	}

	draw() {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}
}

let roundThings = [];

for (let i = 0; i < 1; i++) {
	roundThings.push(new RoundThing());
}

let turrets = [
	new Turret(100, 100, roundThings),
	new Turret(canvas.width - 100, 100, roundThings),
	new Turret(100, canvas.height - 100, roundThings),
	new Turret(canvas.width - 100, canvas.height - 100, roundThings),
];

let lastDirectionChange = 0;
let currentTime = 0;

function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;
	lastDirectionChange += elapsedTime;

	console.log(timestamp, elapsedTime);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	roundThings.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	turrets.forEach((r) => {
		r.update(elapsedTime);
		r.draw();
	});

	// t1.update(elapsedTime);
	// t1.draw();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
