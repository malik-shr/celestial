import Particles from "./particle"
import Element from "./element"
import Sprite from "./sprite"

export default class Bubble extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game

        this.collided = false
        this.cooldown = 0

        this.currentFrame = 0
        this.elapsedFrames = 0

        this.sprite = new Sprite("bubble.png", 32, 32, 70, 70)
    }

    action() {
        if (!this.collided) return

        if (this.collided) {
            ++this.cooldown
        }

        if (this.cooldown === 1) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x,
                    this.position.y,
                    ["#ffdf29", "#ffc20e", "#fcec90"],
                    0
                )
            )
        }

        if (this.cooldown === 70) {
            this.cooldown = 0
            this.collided = false
        }
    }

    handleCollisionY(player) {
        this.handleCollision(player)
    }

    handleCollisionX(player) {
        this.handleCollision(player)
    }

    handleCollision(player) {
        if (!this.collided) {
            this.collided = true
            player.canDash = true
        }
    }

    draw(ctx) {
        this.updateFrames()
        if (this.collided) return

        this.sprite.draw(ctx, this.currentFrame, 0, this.position)
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % 21 === 0) {
            if (this.currentFrame < 3 - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }
}
