import ElementList from "../element/elementList"
import Player from "../element/player"
import Checkpoint from "../element/checkpoint"
import JumpPad from "../element/jumpPad"
import MovingPlatform from "../element/movingPlatform"
import SolidBlock from "../element/solidBlock"
import TemporaryBlock from "../element/temporaryBlock"
import Spike from "../element/spike"
import Goal from "../element/goal"
import Bubble from "../element/bubble"
import levelEditor from "../element/levelEditor"

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

        this.elementList.add(new levelEditor(this.game, this))

        this.elementList.add(new SolidBlock(0, 288, 32, 32, 6))

        //add LevelEditor Stuff here
        this.elementList.add(new SolidBlock(0, 288, 32, 32, 6))
        this.elementList.add(new SolidBlock(224, 96, 32, 32, 5))
        this.elementList.add(new SolidBlock(256, 96, 32, 32, 5))
        this.elementList.add(new SolidBlock(288, 96, 32, 32, 5))
        this.elementList.add(new SolidBlock(288, 64, 32, 32, 5))
        this.elementList.add(new SolidBlock(256, 64, 32, 32, 5))
        this.elementList.add(new SolidBlock(224, 64, 32, 32, 5))
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
