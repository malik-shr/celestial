import ElementList from "../element/elementList"
import Player from "../element/player"
import Checkpoint from "../element/checkpoint"
import JumpPad from "../element/jumpPad"
import MovingPlatform from "../element/movingPlatform"
import SolidBlock from "../element/solidBlock"
import TemporaryBlock from "../element/temporaryBlock"
import Spike from "../element/spike"
import Goal from "../element/goal"

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
        this.elementList.add(new Player(0, 0, this.game, this))

        for (let i = 0; i <= 100; i++) {
            this.elementList.add(new SolidBlock(0 + i * 32, 288, 32, 32))
        }

        this.elementList.add(new Spike(200 - 64, 256, 32, 32))
        this.elementList.add(new JumpPad(200, 256, 32, 32))
        this.elementList.add(new TemporaryBlock(232, 256, 32, 32))
        this.elementList.add(new Checkpoint(264, 256, this.game, 32, 32))

        this.elementList.add(new Goal(600, 256, this.game, 32, 32))

        for (let i = 0; i <= 10; i++) {
            this.elementList.add(new SolidBlock(364 + i * 32, 128, 32, 32))
        }

        for (let i = 0; i <= 3; i++) {
            this.elementList.add(new SolidBlock(250 + i * 32, 128, 32, 32))
        }

        for (let i = 0; i <= 10; i++) {
            this.elementList.add(new SolidBlock(600 + 32 * i, 32, 32, 32))
        }

        for (let i = 0; i <= 10; i++) {
            this.elementList.add(new SolidBlock(600 + 32 * i, 0, 32, 32))
        }

        this.elementList.add(new MovingPlatform(0, 224, 64, 32, 0, -2))
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
