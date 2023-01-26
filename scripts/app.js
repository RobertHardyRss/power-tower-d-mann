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
	constructor(defaultColor) {
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;
		this.xDirection = 1;
		this.yDirection = 1;
		this.color = defaultColor;
		this.radius = 16;

		this.setRandomDirection();
	}

	getRandomDirection() {
		return Math.random() > 0.5 ? 1 : -1;
	}

	setRandomDirection() {
		this.xDirection = this.getRandomDirection();
		this.yDirection = this.getRandomDirection();
	}

	update() {
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

let c1 = new RoundThing("green");
let c2 = new RoundThing("purple");
let c3 = new RoundThing("red");

let lastDirectionChange = 0;
let currentTime = 0;

function gameLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;
	lastDirectionChange += elapsedTime;

	console.log(timestamp, elapsedTime);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (lastDirectionChange >= 250) {
		lastDirectionChange = 0;

		c1.setRandomDirection();
		c2.setRandomDirection();
		c3.setRandomDirection();
	}

	c1.update();
	c2.update();
	c3.update();

	c1.draw();
	c2.draw();
	c3.draw();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

// gameLoop();
// x = 50;
// gameLoop();
// x = 500;
// gameLoop();
