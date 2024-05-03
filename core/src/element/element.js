export default class Element {
    position
    sizeX
    sizeY

    // TODO extend element class
    constructor(x, y, sizeX = 1, sizeY = 1) {
        this.position = {
            x: x,
            y: y,
        }
        this.sizeX = sizeX
        this.sizeY = sizeY
    }

    action() {}

    draw(ctx) {}

    checkCollision(element) {}
}
