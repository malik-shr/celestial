import Element from "./element"

export default class Checkpoint extends Element {
    constructor(x, y, relativeWidth = 1, relativeHeight = 1) {
        super(x, y, relativeWidth, relativeHeight)
    }

    handleCollisionX(player) {
        player.respawnPoint = structuredClone(this.position)
    }

    handleCollisionY(player) {
        player.respawnPoint = structuredClone(this.position)
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    }
}
