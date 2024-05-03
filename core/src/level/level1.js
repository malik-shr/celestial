import Player from "../element/player"
import SolidBlock from "../element/solidBlock"
import Level from "./level"

// TODO add some elements to level1 and determine element logic

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
}

// first argument is name, second is gravity constant
export const level1 = new Level("1", 7)

level1.elementList.add(new Player(32, 64, level1))
level1.elementList.add(new SolidBlock(0, 416, 64, 1))
level1.elementList.add(new SolidBlock(getRandomInt(0, 700), getRandomInt(0, 384), getRandomInt(1, 5), getRandomInt(1, 5)))


