import Element from "./element"
import Sprite from "./sprite"

export default class Bubble extends Element {
    constructor(x, y) {
        super(x, y)

        this.collided = false
        this.cooldown = 0

        this.sprite = new Sprite("temporary_block.png", 32, 32, 32, 32)
    }

    action() {
        if (this.collided) {
            ++this.cooldown
        }

        if (this.cooldown === 70) {
            this.cooldown = 0
            this.collided = false
        }
    }

    handleCollisionY(player) {
        if (!this.collided) {
            this.collided = true
            player.canDash = true
        }

        if (this.cooldown < 4) {
            player.velocity.x *= 0.7
            player.velocity.y *= 0.7
        }
    }

    handleCollisionX(player) {
        if (!this.collided) {
            this.collided = true
            player.canDash = true
        }

        if (this.cooldown < 4) {
            player.velocity.x *= 0.7
            player.velocity.y *= 0.7
        }
    }

    draw(ctx) {
        if (this.cooldown > 20) return

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
