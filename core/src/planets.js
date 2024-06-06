import Sprite from "./element/sprite"
import ButtonList from "./ui/buttonList"

/**
 * @typedef {Object} Planet
 * @property {number} gravity
 * @property {Sprite} bg
 * @property {Sprite} bgTop
 * @property {Sprite} tileset
 * @property {ButtonList} buttonList
 */

/** @typedef {Object.<string, Planet>} PlanetMap */

/** * @type {PlanetMap} */
export function getPlanets(canvas) {
    return {
        moon: {
            gravity: 0,
            bg: new Sprite(),
            bgTop: new Sprite(),
            tileset: new Sprite(),
            buttonList: new ButtonList(canvas),
        },
        mars: {
            gravity: 0,
            bg: new Sprite(),
            bgTop: new Sprite(),
            tileset: "",
            buttonList: new ButtonList(canvas),
        },
        saturn: {
            gravity: 0,
            bg: new Sprite(),
            bgTop: new Sprite(),
            tileset: new Sprite(),
            buttonList: new ButtonList(canvas),
        },
    }
}
