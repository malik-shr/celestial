/**
 * @typedef {Object} Planet
 * @property {number} gravity
 * @property {string} backgroundImage
 * @property {string} tileset
 */

import Sprite from "./element/sprite"
import ButtonList from "./ui/buttonList"

/** @typedef {Object.<string, Planet>} PlanetMap */

/** * @type {PlanetMap} */
export function getPlanets(canvas) {
    return {
        moon: {
            gravity: 0,
            backgroundImage: "",
            tileset: "",
            sprite: new Sprite("bg/moon.png", 300, 300, 300, 300),
            buttonList: new ButtonList(canvas),
        },
        mars: {
            gravity: 0,
            backgroundImage: "",
            tileset: "",
            sprite: new Sprite("bg/mars.png", 339, 339, 339, 339),
            buttonList: new ButtonList(canvas),
        },
        saturn: {
            gravity: 0,
            backgroundImage: "",
            tileset: "",
            sprite: new Sprite("bg/saturn.png", 520, 456, 520, 456),
            buttonList: new ButtonList(canvas),
        },
    }
}
