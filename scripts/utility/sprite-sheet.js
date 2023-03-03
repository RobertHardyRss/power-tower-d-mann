//@ts-check
import enemySpriteData from "../../assets/images/sprite-sheet-enemies.json" assert { type: "json" };
import miscSpriteData from "../../assets/images/sprite-sheet-misc.json" assert { type: "json" };
import playerSpriteData from "../../assets/images/sprite-sheet-player.json" assert { type: "json" };

class SpriteSheet {
	/**
	 * @param {{ frames: { filename: string; frame: { x: number; y: number; w: number; h: number; }; rotated: boolean; trimmed: boolean; spriteSourceSize: { x: number; y: number; w: number; h: number; }; sourceSize: { w: number; h: number; }; pivot: { x: number; y: number; }; }[]; meta: { app: string; version: string; image: string; format: string; size: { w: number; h: number; }; scale: string; related_multi_packs: string[]; smartupdate: string; }; }} data
	 */
	constructor(data) {
		this.data = data;

		/** @type {HTMLImageElement} */ //@ts-ignore
		this.image = document.getElementById(
			data.meta.image.replace(".png", "")
		);
	}

	/**
	 * @param {string} name
	 * @returns {{ filename: string; frame: { x: number; y: number; w: number; h: number; }; rotated: boolean; trimmed: boolean; spriteSourceSize: { x: number; y: number; w: number; h: number; }; sourceSize: { w: number; h: number; }; pivot: { x: number; y: number; }; }[]}
	 */
	getFrames(name) {
		const frames = this.data.frames.filter((f) =>
			f.filename.startsWith(name)
		);
		return frames;
	}

	/**
	 * @param {string} name
	 * @returns {{ filename: string; frame: { x: number; y: number; w: number; h: number; }; rotated: boolean; trimmed: boolean; spriteSourceSize: { x: number; y: number; w: number; h: number; }; sourceSize: { w: number; h: number; }; pivot: { x: number; y: number; }; }}
	 */
	getFrame(name) {
		return this.getFrames(name)[0];
	}
}

export const playerSpriteSheet = new SpriteSheet(playerSpriteData);

export const enemySprite = new SpriteSheet(enemySpriteData);
