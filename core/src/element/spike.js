import Element from "./element"
import Sprite from "./sprite"

export default class Spike extends Element {
    constructor(x, y) {
        super(x, y)

        this.height = 24

        this.spikes = new Sprite("spikes/spikes_alternative.png", this.width, this.height, 70, 48)
        this.currentSprite = this.spikes
        this.currentFrame = 0
        this.elapsedFrames = 0

        this.collisionOffset = {
            x: 10,
            y: 10,
        }
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
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % 11 === 0) {
            if (this.currentFrame < 7 - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }
}
