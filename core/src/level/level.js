import ElementList from "../element/elementList"
import Player from "../element/player"
import LevelEditor from "../element/levelEditor"

export default class Level {
    constructor(name, gravity = 0.8, planet, game) {
        this.name = name
        this.gravity = gravity
        this.planet = planet
        this.game = game

        this.elementList = new ElementList()
    }

    initLevel(elementList) {
        for (const element of elementList) {
            this.elementList.add(element)
        }

        this.elementList.add(new Player(0, 0, this.game, this))
        this.elementList.add(new LevelEditor(this.game, this))
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
