import ElementList from "../element/elementList"
import Player from "../element/player"
import Checkpoint from "../element/checkpoint"
import JumpPad from "../element/jumpPad"
import MovingPlatform from "../element/movingPlatform"
import SolidBlock from "../element/solidBlock"
import TemporaryBlock from "../element/temporaryBlock"

export default class Level {
    constructor(name, gravity, game) {
        this.name = "init"
        this.gravity = 0.8
        this.game = game

        this.elementList = new ElementList()
    }

    initLevel(name, gravity) {
        this.name = name
        //Todo initialise Level with Levelparser
        this.elementList.add(new Player(0, 0, this))
        this.elementList.add(new SolidBlock(0, 256, 100, 1))

        this.elementList.add(new JumpPad(200, 224, 1, 1))
        this.elementList.add(new TemporaryBlock(232, 224, 1, 1))
        this.elementList.add(new Checkpoint(264, 224, 1, 1))

        this.elementList.add(new SolidBlock(364, 128, 10, 1))
        this.elementList.add(new SolidBlock(32, 96, 3, 1))

        this.elementList.add(new SolidBlock(250, 50, 3, 1))

        this.elementList.add(new SolidBlock(600, 32, 10, 1))
        this.elementList.add(new SolidBlock(600, 0, 10, 1))

        this.elementList.add(new MovingPlatform(0, 140, 3, 1, 5, 0))
    }

    getPlayer() {
        for (const element of this.elementList) {
            if (element instanceof Player) {
                return element
            }
        }

        return null
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * max) + min
    }
}
