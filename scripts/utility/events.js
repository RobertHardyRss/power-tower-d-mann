//@ts-check

export const EVENTS = {
	upgrade: "td-upgrade",
	upgradeComplete: "td-upgraded",
	enemyDeath: "td-enemy-death",
	playerDamage: "td-player-damage",
	playerDeath: "td-player-death",
	toggleUpgradeUi: "td-toggle-upgrade",
};

export class TurretUpgradeEvent {
	/**
	 * @param {string} name
	 * @param {string} description
	 */
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}
}

export class ToggleUpgradeUiEvent {
	/**
	 * @param {boolean} show
	 */
	constructor(show) {
		this.show = show;
	}
}
