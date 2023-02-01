//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

class Turret {
	constructor() {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.color = "black";
		this.angle = 0;

		/** @type { RoundThing | null } */
		this.target = null;
	}

	setTarget(target) {
		this.target = target;
	}

	update(elapsedTime) {
		if (this.target == null) return;

		let dx = this.x - this.target.x;
		let dy = this.y - this.target.y;
		this.angle = Math.atan2(dy, dx);
	}

	draw() {
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

let t1 = new Turret();
t1.setTarget(roundThings[0]);

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

	t1.update(elapsedTime);
	t1.draw();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
