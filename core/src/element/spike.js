import Element from "./element"

export default class Spike extends Element {
    constructor(x, y, game, relativeWidth = 1, relativeHeight = 1) {
        super(x, y + 7, relativeWidth, relativeHeight)
    }

    handleCollisionX(player) {
        if (!player.isDead) {
            player.die()
        }
    }

    handleCollisionY(player) {
        if (!player.isDead) {
            player.die()
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, 25)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.closePath()
    }
}
