import ElementList from "../element/elementList"

export default class Level {
    // TODO extend level class
    name
    elementList

    gravity
    groundPosition

    constructor(name, gravity) {
        this.name = name
        this.elementList = new ElementList()
        this.gravity = gravity
        this.groundPosition = 448
    }
}
