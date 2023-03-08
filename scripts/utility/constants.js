//@ts-check

const CIRCLE = Math.PI * 2;
const SPAWN_RADIUS = 1200;

/**
 * @type {{ x: number; y: number; }[]}
 */
export const ENEMY_SPAWN_POINTS = [];

for (let angle = 0; angle < CIRCLE; angle += CIRCLE / 36) {
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
	// remove health upgrade at turret level for now
	//health: "Health",
};

export const TURRET_UPGRADE_BASE_COST = {
	damage: 2,
	health: 2,
	range: 2,
	rateOfFire: 2,
	targetingSpeed: 2,
};
