import Element from "./element"

export default class SolidBlock extends Element {
    constructor(x, y, sizeX = 1, sizeY = 1) {
        super(x, y, sizeX, sizeY)
    }

    action() {}

    checkCollision(element) {}

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, this.sizeX * 32, this.sizeY * 32)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath()
    }
}
