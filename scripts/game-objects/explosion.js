//@ts-check
import { ctx } from "../utility/canvas.js";

export class Explosion {
	/**
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} p
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(x, y, p, ctx) {
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.color = 20;
		this.particleCount = p;
		this.particles = [];
		this.size = 3;
		this.speed = 1;
        this.done = false
        this.getParticles(this.particleCount)
	}

    getParticles(p) {
        for (let i = 0; i < this.particleCount; i++) {
			let thing = Math.random() * 30 - 15;
            let angle = Math.random() * Math.PI * 2;
            let sp = Math.random()*this.speed;
			let particle = {
				x: this.x,
				y: this.y,
				s: Math.random() * this.size + 1,
				c: this.color + thing,
                l: Math.random() * 100 + 10,
                xdel: Math.cos(angle) * sp,
                ydel: Math.sin(angle) * sp,
				light: Math.random()* 75
			};
            this.particles.push(particle)
		}
    }

	update(elapsedTime) {
		this.particles.forEach((p) => {
			p.x += p.xdel
			p.y += p.ydel
            p.l--
		});
		
        if(this.particles.length <= 0) {
            this.done = true
        }

	}

	draw() {
		this.particles.forEach((p) => {
            this.ctx.save();
			this.ctx.fillStyle = `hsla(${p.c}, 100%, ${p.light}%, 1)`;
			this.ctx.fillRect(p.x, p.y, p.s, p.s);
			ctx.restore();
		});
        this.particles = this.particles.filter((p) => p.l > 0)
        
	}
}
