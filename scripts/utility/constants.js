//@ts-check

<<<<<<< HEAD
<<<<<<< HEAD

export const ENEMY_SPAWN_POINTS = [
    {x:0, y:1200},
    {x:0, y:-1200},
    {x:1200, y:0},
    {x:-1200, y:0}
]
=======
export const ENEMY_SPAWN_POINTS = [
	{ x: 0, y: 1200, }, // 12 o'clock
	{ x: 0, y: -1200 }, // 6 o'clock
	{ x: 1200, y: 0 }, // 3 o'clock
	{ x: -1200, y: 0 }, // 9 o'clock
];
>>>>>>> origin/robert
=======
const CIRCLE = Math.PI * 2;
const SPAWN_RADIUS = 1200;

/**
 * @type {{ x: number; y: number; }[]}
 */
export const ENEMY_SPAWN_POINTS = [];

for (let angle = 0; angle < CIRCLE; angle += CIRCLE / 12) {
	ENEMY_SPAWN_POINTS.push({
		x: Math.floor(Math.cos(angle) * SPAWN_RADIUS),
		y: Math.floor(Math.sin(angle) * SPAWN_RADIUS),
	});
}

export const TURRET_UPGRADES = {
	range: "Range",
	rateOfFire: "Rate of Fire",
	damage: "Damage",
	targetingSpeed: "Targeting Speed",
	health: "Health",
};

export const TURRET_UPGRADE_BASE_COST = {
	range: 2,
	rateOfFire: 2,
	damage: 2,
	targetingSpeed: 2,
	health: 2,
};
>>>>>>> origin/develop
