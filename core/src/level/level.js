import ElementList from "../element/elementList"
import Player from "../element/player"

export default class Level {
    constructor(name, gravity) {
        this.name = name
        this.elementList = new ElementList()
        this.gravity = gravity
    }

    getPlayer() {
        for (const element of this.elementList) {
            if (element instanceof Player) {
                return element
            }
        }

        return null
    }
}
