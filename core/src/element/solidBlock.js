import Element from "./element"

export default class SolidBlock extends Element {
    constructor(x, y, relativeWidth = 1, relativeHeight = 1) {
        super(x, y, relativeWidth, relativeHeight)
    }

    action() {}

    checkCollision(element) {}

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath()
    }
}
