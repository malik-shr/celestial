import SolidBlock from "./solidBlock"

export default class JumpPad extends SolidBlock {
    activeFrames = 0
    isActive = false

    constructor(x, y) {
        super(x, y)
    }

    action() {
        if (!this.isActive) return

        ++this.activeFrames

        if (this.activeFrames === 20) {
            this.activeFrames = 0
            this.isActive = false
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.sizeX * 32, this.sizeY * 32)
        ctx.fillStyle = this.isActive ? "yellow" : "purple"
        ctx.fill()
        ctx.closePath()
    }
}
