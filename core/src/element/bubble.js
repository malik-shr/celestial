import Element from "./element"

export default class Bubble extends Element {
    constructor(x, y) {
        super(x, y)

        this.collisionOffset = {
            x: 10,
            y: 10,
        }
    }

    handleCollisionX(player) {
        player.velocity.x *= 0.6

        if (!player.canDash) {
            player.canDash = true
        }
    }

    handleCollisionY(player) {
        player.velocity.y *= 0.6

        if (!player.canDash) {
            player.canDash = true
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2,
            this.width / 2,
            0,
            Math.PI * 2
        )
        ctx.fillStyle = "rgba(255,255,255,0.2)"
        ctx.fill()
        ctx.closePath()
    }
}
