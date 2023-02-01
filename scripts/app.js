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

		this.x = sx;
		this.y = sy;
		this.isVisible = true;
		this.speed = 20;
	}

	update(elapsedTime) {
		if (this.x == this.tx && this.y == this.ty) {
			this.isVisible = false;
			return;
		}

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
	constructor(sx, sy) {
		this.x = sx;
		this.y = sy;
		this.color = "black";
		this.angle = 0;

		/** @type { RoundThing | null } */
		this.target = null;

		/** @type { Projectile[] } */
		this.projectiles = [];
		this.rateOfFire = 250; // milliseconds
		this.lastFireTime = 0;
	}

	setTarget(target) {
		this.target = target;
	}

	update(elapsedTime) {
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
	new Turret(100, 100),
	new Turret(canvas.width - 100, 100),
	new Turret(100, canvas.height - 100),
	new Turret(canvas.width - 100, canvas.height - 100),
];

turrets.forEach((t) => {
	t.setTarget(roundThings[0]);
});

// let t1 = new Turret(100, 100);
// t1.setTarget(roundThings[0]);

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
