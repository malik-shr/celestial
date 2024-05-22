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
export const level1 = new Level("1", 0.8)

// Boden
level1.elementList.add(new SolidBlock(32 * 0, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 1, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 2, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 3, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 4, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 5, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 6, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 7, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 8, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 9, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 10, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 11, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 12, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 13, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 14, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 15, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 16, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 17, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 18, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 19, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 20, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 21, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 22, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 23, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 24, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 25, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 26, 416, 1, 1))
level1.elementList.add(new SolidBlock(32 * 27, 416, 1, 1))

// physics debug Blöcke
level1.elementList.add(new SolidBlock(32 * 4, 388 - 32 * 0.5, 1, 1))

level1.elementList.add(new SolidBlock(32 * 4, 388 - 32 * 3.5, 1, 2))

level1.elementList.add(new SolidBlock(0, 388 - 32, 2, 1))
level1.elementList.add(new SolidBlock(0, 388 - 32 * 3, 1, 2))
level1.elementList.add(new SolidBlock(0.4, 388 - 32 * 6, 1, 2))

level1.elementList.add(new SolidBlock(0, 388 - 32 * 3, 2, 1))
level1.elementList.add(new SolidBlock(32 * 5, 388 - 32 * 6, 2, 2))

// erste Säule
level1.elementList.add(new SolidBlock(32 * 8, 388 - 32 * 0, 1, 1))
level1.elementList.add(new SolidBlock(32 * 8, 388 - 32 * 1, 1, 1))
level1.elementList.add(new SolidBlock(32 * 8, 388 - 32 * 2, 1, 1))
level1.elementList.add(new SolidBlock(32 * 8, 388 - 32 * 3, 1, 1))
level1.elementList.add(new SolidBlock(32 * 8, 388 - 32 * 4, 1, 1))
level1.elementList.add(new SolidBlock(32 * 8, 388 - 32 * 5, 1, 1))

// zweite Säule
level1.elementList.add(new SolidBlock(32 * 15, 388 - 32 * 0, 1, 1))
level1.elementList.add(new SolidBlock(32 * 15, 388 - 32 * 1, 1, 1))
level1.elementList.add(new SolidBlock(32 * 15, 388 - 32 * 2, 1, 1))
level1.elementList.add(new SolidBlock(32 * 15, 388 - 32 * 3, 1, 1))
level1.elementList.add(new SolidBlock(32 * 15, 388 - 32 * 4, 1, 1))
level1.elementList.add(new SolidBlock(32 * 15, 388 - 32 * 5, 1, 1))

level1.elementList.add(new JumpPad(256, 384, 1, 1))

// pos x,y size x,y speed x,y
level1.elementList.add(new MovingPlatform(200, 388 - 32 * 6, 3, 1, 5, 0))

level1.elementList.add(new Player(32, 64, level1))

level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 1500),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
level1.elementList.add(
    new SolidBlock(
        getRandomInt(0, 700),
        getRandomInt(0, 384),
        getRandomInt(1, 5),
        getRandomInt(1, 5)
    )
)
