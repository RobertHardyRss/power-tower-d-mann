//@ts-check
/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
const canvas = document.getElementById("game-canvas");
/** @type {CanvasRenderingContext2D} */
//@ts-ignore
const ctx = canvas.getContext("2d");
canvas.width = 1376;
canvas.height = 800;
import { Turret } from "./game-objects/Turret.js";
import { RoundThing } from "./game-objects/Round-thing.js";


class Game {
    constructor() {
        this.Player = {
            health: 100,
            credits: 0
        }
        this.gridSize = 32;
        this.currentLevel = undefined
    }
}


let roundThings = [];

for (let i = 0; i < 100; i++) {
	roundThings.push(new RoundThing(ctx, canvas.width/2, canvas.height/2));
}

let turrets = [
	new Turret(ctx,100, 100, roundThings),
	new Turret(ctx,canvas.width - 100, 100, roundThings),
	new Turret(ctx,100, canvas.height - 100, roundThings),
	new Turret(ctx,canvas.width - 100, canvas.height - 100, roundThings),
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
