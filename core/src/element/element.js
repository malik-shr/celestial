export default class Element {
    position
    width
    height

    // TODO extend element class
    constructor(x, y, relativeWidth = 1, relativeHeight = 1) {
        this.position = {
            x: x,
            y: y,
        }
        this.width = relativeWidth * 32
        this.height = relativeHeight * 32
    }

    action() {}

    draw(ctx) {}
}
