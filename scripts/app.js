//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

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

for (let i = 0; i < 100; i++) {
	roundThings.push(new RoundThing());
}

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

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

// gameLoop();
// x = 50;
// gameLoop();
// x = 500;
// gameLoop();
