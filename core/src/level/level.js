import ElementList from "../element/elementList"
import Player from "../element/player"

export default class Level {
    constructor(name, gravity) {
        this.name = name
        this.gravity = gravity

        this.elementList = new ElementList()
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
