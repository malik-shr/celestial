import JumpPad from "../element/jumpPad"
import MovingPlatform from "../element/movingPlatform"
import Player from "../element/player"
import SolidBlock from "../element/solidBlock"
import Level from "./level"

// TODO add some elements to level1 and determine element logic

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min
}

// first argument is name, second is gravity constant
export const level1 = new Level("Level 1", 0.8)

level1.elementList.add(new Player(0, 0, level1))
level1.elementList.add(new SolidBlock(0, 256, 100, 1))

level1.elementList.add(new JumpPad(200, 224, 1, 1))

level1.elementList.add(new SolidBlock(364, 128, 10, 1))
level1.elementList.add(new SolidBlock(32, 96, 3, 1))

level1.elementList.add(new SolidBlock(250, 50, 3, 1))

level1.elementList.add(new SolidBlock(600, 32, 10, 1))

level1.elementList.add(new MovingPlatform(0, 140, 3, 1, 5, 0))
