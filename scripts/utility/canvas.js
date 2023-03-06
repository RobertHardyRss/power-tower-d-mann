/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
export const canvas = document.getElementById("game-canvas");

/** @type {CanvasRenderingContext2D} */
//@ts-ignore ctx is a CanvasRenderingContext2D
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const normalizePoint = function (x, y) {
	return {
		x: x + canvas.width / 2,
		y: y + canvas.height / 2,
	};
};
