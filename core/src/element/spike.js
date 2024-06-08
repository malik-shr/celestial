import Element from "./element"
import Sprite from "./sprite"

export default class Spike extends Element {
    constructor(x, y, width, height, type) {
        super(x, y, width, height)

        this.type = type

        this.imageSrc = "spikes/spike_up.png"
        this.cropWidth = 70
        this.cropHeight = 48

        switch (type) {
            case 1:
                this.imageSrc = "spikes/spike_up.png"
                break
            case 2:
                this.imageSrc = "spikes/spike_left.png"
                this.cropWidth = 48
                this.cropHeight = 70
                break
            case 3:
                this.imageSrc = "spikes/spike_right.png"
                this.cropWidth = 48
                this.cropHeight = 70
                break
            case 4:
                this.imageSrc = "spikes/spike_down.png"
                break
            default:
        }

        this.spikes = new Sprite(
            this.imageSrc,
            this.width,
            this.height,
            this.cropWidth,
            this.cropHeight
        )

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
        ctx.beginPath()

        this.updateFrames()
        ctx.save()

        if (this.type === 1 || this.type === 4) {
            this.currentSprite.draw(ctx, this.currentFrame, 0, this.position)
        } else {
            this.currentSprite.draw(ctx, 0, this.currentFrame, this.position)
        }

        ctx.restore()
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
