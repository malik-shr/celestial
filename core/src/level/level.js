import ElementList from "../element/elementList"

export default class Level {
    constructor(name, gravity) {
        this.name = name
        this.elementList = new ElementList()
        this.gravity = gravity
        this.groundPosition = 448
    }
}
