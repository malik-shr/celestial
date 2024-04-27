export default class Element {
    x
    y
    sizeX
    sizeY

    // TODO extend element class
    constructor(x, y, sizeX = 1, sizeY = 1) {
        this.x = x
        this.y = y
        this.sizeX = sizeX
        this.sizeY = sizeY
    }

    action() {}

    draw(ctx) {}

    checkCollision(element) {}
}
