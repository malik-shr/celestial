import ElementList from "../element/elementList"

export default class Level {
    // TODO extend level class
    name
    elementList

    gravity
    groundPosition

    constructor(name) {
        this.name = name
        this.elementList = new ElementList()
        this.gravity = 0
        this.groundPosition = 256
    }
}
