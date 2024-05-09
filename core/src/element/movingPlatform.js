import SolidBlock from "./solidBlock"

export default class MovingPlatform extends SolidBlock {
    activeFrames = 0
    isActive = 0
    velocity
    steppedOn

    constructor(x, y, velocityX, velocityY) {
        super(x, y)
        this.width = 96
        this.velocity = {
            x: velocityX,
            y: velocityY,
        }
        this.steppedOn = false
    }

    handleCollisionY(player) {
        super.handleCollisionY(player)

        // if above top of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y <=
            this.position.y - player.height
        ) {
            player.position.y += this.velocity.y

            // save current player velocities
            this.previousVelocityX = player.velocity.x

            // do additional collision logic

            // player x velocity an platform angleichen wenn er auf sie aufkommt

            // falls sich der player bewegt geschwindigkeit nur höchstens bis platform velocity verringern, durch stetige verringerung der x velocity
            if (!this.steppedOn) {
                player.velocity.x = this.velocity.x
                player.velocity.y = this.velocity.y
            }

            player.standingOnMovingPlatform = true
            player.PlatformVelocity = this.velocity.x
            this.steppedOn = true

            this.isActive = 1

            // save the object reference in case of reset
            player.collidedObjects.push(this)
        }
    }

    handleCollisionX(player) {
        super.handleCollisionX(player)
    }

    revertYCollision(player) {
        // do additional reversion logic
        this.activeFrames = 0
        this.isActive = 0

        player.standingOnMovingPlatform = false

        player.velocity.x = this.previousVelocityX

        // theoretically would have to reset x velocities but this is not going to matter
    }

    action() {
        this.isActive -= 1

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.isActive < 0) {
            this.steppedOn = false
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "cyan"
        ctx.fill()
        ctx.closePath()
    }
}
