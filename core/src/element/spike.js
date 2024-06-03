import Element from "./element"
import Sprite from "./sprite"

export default class Spike extends Element {
    constructor(x, y, game, relativeWidth = 1, relativeHeight = 1) {
        super(x, y + 7, relativeWidth, relativeHeight)

        this.spikes = new Sprite("spikes/spikes2.png", this.width, this.height, 70, 70)
        this.currentSprite = this.spikes
        this.currentFrame = 0
        this.elapsedFrames = 0
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
        this.updateFrames()
        this.currentSprite.draw(ctx, this.currentFrame, 0, this.position)
        ctx.beginPath()
        // ctx.rect(this.position.x, this.position.y, this.width, 25)
        ctx.fillStyle = "white"
        ctx.fill()
        ctx.closePath()
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % 11 === 0) {
            if (this.currentFrame < 7 - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }
}
