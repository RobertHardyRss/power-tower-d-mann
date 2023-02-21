/** @type {HTMLCanvasElement} */
//@ts-ignore canvas is an HTMLCanvasElement
export const canvas = document.getElementById("game-canvas");

/** @type {CanvasRenderingContext2D} */
//@ts-ignore
export const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
