import SolidBlock from "./solidBlock"
import Sprite from "./sprite"
export default class JumpPad extends SolidBlock {
    constructor(x, y) {
        super(x, y)

        this.activeFrames = 0
        this.isActive = false

        this.jumpPadStill = new Sprite("player/jumpPadStill.png", this.width, this.height, 70, 70)
        this.jumpPadAni = new Sprite("player/jumpPadAni.png", this.width, this.height, 70, 70)

        this.currentSprite = this.jumpPadStill
        this.currentFrame = 0
        this.elapsedFrames = 0
    }

    handleCollisionY(player, currentPositionY, currentVelocityY) {
        super.handleCollisionY(player, currentPositionY, currentVelocityY)

        // if player landed on Jumppad
        if (
            player.previous.position.y - player.previous.velocity.y <=
            this.position.y - player.height
        ) {
            // do additional collision logic
            player.velocity.y = -15

            this.isActive = true
            this.currentFrame = 0
            player.isGrounded = false
        }

        // save the object reference in case of reset
        player.collidedSpecialObjects.push(this)
    }

    handleCollisionX(player, currentPositionX, currentVelocityX) {
        super.handleCollisionX(player, currentPositionX, currentVelocityX)
    }

    revertYCollision(player) {
        // do additional reversion logic
        this.activeFrames = 0
        this.isActive = false
    }

    action() {
        if (!this.isActive) return

        ++this.activeFrames

        if (this.activeFrames === 20) {
            this.activeFrames = 0
            this.isActive = false
        }

        if (this.isActive) {
            this.currentSprite = this.jumpPadAni
        } else this.currentSprite = this.jumpPadStill
    }

    draw(ctx) {
        this.updateFrames()
        this.currentSprite.draw(ctx, this.currentFrame, 0, this.position)
    }
    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % 4 === 0) {
            if (this.isActive) {
                // Only iterate once when jumping
                if (this.currentFrame < 8 - 1) {
                    this.currentFrame++
                } else {
                    this.isActive = false
                    this.currentFrame = 0
                }
            }
        }
    }
}
