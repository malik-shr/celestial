import SolidBlock from "./solidBlock"

export default class JumpPad extends SolidBlock {
    activeFrames = 0
    isActive = false

    constructor(x, y) {
        super(x, y)
    }

    handleCollisionY(
        player,
        currentPositionY,
        currentVelocityY,
        currentCameraBoxY = 0,
        currentGravity = 0,
        currentIsJumping = false,
        currentIsGrounded = false,
        currentCanDash = false,
        currentWallClimbCounter = 0
    ) {
        super.handleCollisionY(
            player,
            currentPositionY,
            currentVelocityY,
            (currentCameraBoxY = 0),
            (currentGravity = 0),
            (currentIsJumping = false),
            (currentIsGrounded = false),
            (currentCanDash = false),
            (currentWallClimbCounter = 0)
        )

        // if above that object last frame
        if (currentPositionY - currentVelocityY <= this.position.y - player.height) {
            // do additional collision logic
            player.velocity.y = -20

            this.isActive = true
        }
    }

    handleCollisionX(player, currentPositionX, currentVelocityX) {
        super.handleCollisionX(player, currentPositionX, currentVelocityX)
    }

    revertYCollision(player) {
        super.revertYCollision(player)

        // do additional reversion logic
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
