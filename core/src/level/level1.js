import JumpPad from "../element/jumpPad"
import Player from "../element/player"
import SolidBlock from "../element/solidBlock"
import Level from "./level"

// TODO add some elements to level1 and determine element logic

function getRandomInt(min, max) {
    return Math.floor(Math.random() * max) + min
}

// first argument is name, second is gravity constant
export const level1 = new Level("1", 0.7)

level1.elementList.add(new SolidBlock(32 * 4, 388, 1, 1))
level1.elementList.add(new SolidBlock(32 * 4, 388 - 32 * 3 - 1, 1, 2))
level1.elementList.add(new SolidBlock(0, 388, 2, 1))
level1.elementList.add(new SolidBlock(0, 388 - 32 * 3, 1, 2))
level1.elementList.add(new SolidBlock(0.4, 388 - 32 * 6, 1, 2))

level1.elementList.add(new SolidBlock(0, 388 - 32 * 3, 2, 1))
level1.elementList.add(new SolidBlock(32 * 3, 388 - 32 * 6, 2, 2))

level1.elementList.add(new SolidBlock(0, 416, 100, 1))

level1.elementList.add(new JumpPad(256, 384, 1, 1))

level1.elementList.add(new Player(32, 64, level1))
level1.elementList.add(
    new SolidBlock(
        getRandomInt(700, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(700, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(700, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(700, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
