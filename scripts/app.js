//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let x = canvas.width / 2;
let y = canvas.height / 2;

let xDirection = 1;
let yDirection = 1;
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
		xDirection = Math.random() > 0.5 ? 1 : -1;
		yDirection = Math.random() > 0.5 ? 1 : -1;
	}

	x = x + xDirection;
	y = y + yDirection;

	ctx.beginPath();
	ctx.arc(x, y, 16, 0, Math.PI * 2);
	ctx.fill();

	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

// gameLoop();
// x = 50;
// gameLoop();
// x = 500;
// gameLoop();
