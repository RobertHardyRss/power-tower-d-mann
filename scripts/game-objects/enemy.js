//@ts-check

export class Enemy {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(ctx, x, y) {
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.level = 1;
		this.speed = 8;

		this.health = 1;
		this.isAlive = true;

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

		if (this.isAlive && this.health <= 0) {
			this.isAlive = false;
		}

		if (!this.isAlive) return;

		if (this.lastDirectionChange >= this.changeInterval) {
			this.lastDirectionChange = 0;
			this.setRandomDirection();
		}

		this.x += this.xDirection;
		this.y += this.yDirection;
	}

	draw() {
		if (!this.isAlive) return;

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.restore();
	}
}

export class EnemyDrone extends Enemy {
	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(ctx, x, y) {
		super(ctx, x, y);

		this.angle = Math.atan2(this.y, this.x);

		this.xoffset = Math.cos(this.angle);
		this.yoffset = Math.sin(this.angle);
	}

	update(elapsedTime) {
		this.x -= this.xoffset * this.speed;
		this.y -= this.yoffset * this.speed;
	}
}
