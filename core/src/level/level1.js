import Player from "../element/player"
import SolidBlock from "../element/solidBlock"
import Level from "./level"

// TODO add some elements to level1 and determine element logic

export const level1 = new Level("1")

level1.elementList.add(new Player(32, 64, level1))
level1.elementList.add(new SolidBlock(0, 480, 64, 1))
