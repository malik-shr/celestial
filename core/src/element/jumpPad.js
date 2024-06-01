import SolidBlock from "./solidBlock"

export default class JumpPad extends SolidBlock {
    constructor(x, y) {
        super(x, y)

        this.activeFrames = 0
        this.isActive = false
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
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = this.isActive ? "yellow" : "purple"
        ctx.fill()
        ctx.closePath()
    }
}
