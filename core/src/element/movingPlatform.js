import Element from "./element"
import Sprite from "./sprite"
export default class MovingPlatform extends Element {
    constructor(x, y, velocityX = 0, velocityY = 0, maxX, maxY, traveledX = 0, traveledY = 0) {
        super(x, y, 64, 16)
        this.velocity = {
            x: velocityX,
            y: velocityY,
        }

        this.traveledX = traveledX
        this.traveledY = traveledY

        this.maxX = maxX
        this.maxY = maxY

        this.isActive = 0
        this.steppedOn = false
        this.sprite = new Sprite("floating.png", this.width, this.height, 128, 32)
    }

    checkCollision(element) {}

    handleCollisionY(player) {
        player.platformVelocityX = this.velocity.x
        player.platformVelocityY = this.velocity.y
        // if above top of element last frame (dont know why minus one maybe a rounding error sometimes?)
        if (
            player.previous.position.y - player.previous.velocity.y - 1 <=
            this.position.y - player.height - this.velocity.y
        ) {
            // set the player above this object, reset the velocities, relevant flags and relevant counters and set collidedDown to true
            player.position.y = this.position.y - player.height

            player.velocity.y = this.velocity.y
            player.gravity = 0
            player.notGroundedCounter = 0
            player.isGrounded = true
            player.isJumping = false
            player.collidedDown = true
            player.canDash = true
            player.WallclimbCounter = 0

            this.WallJumpRightCounter = 50
            this.WallJumpLeftCounter = 50
            player.collidedDownCounter = 0

            // do additional collision logic

            // save current player velocities
            this.playerPreviousVelocityX = player.velocity.x

            if (player.collidedUpCounter < 2 && !player.isDead) {
                player.die()
            }

            // player x velocity an platform angleichen wenn er auf sie aufkommt
            // if (!this.steppedOn) {
            //     // player.velocity.x = this.velocity.x
            //     player.velocity.y = this.velocity.y
            // }

            player.standingOnMovingPlatform = true
            player.collidingWithPlatformCounter = 0
            this.steppedOn = true

            this.isActive = 2

            // save the object reference in case of reset
            player.collidedSpecialObjects.push(this)
        }

        // if below bottom of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y >=
            this.position.y + this.height - this.velocity.y
        ) {
            // set the player below this object, reset the velocities, relevant flags and relevant counters and set collidedUp to true
            player.position.y = this.position.y + this.height

            player.velocity.y = 0
            if (this.velocity.y > 0) {
                player.velocity.y = this.velocity.y
            }
            player.gravity = 0
            player.collidedUp = true
            player.collidedUpCounter = 0
            player.isJumping = false

            // do additional collision logic

            if (player.collidedDownCounter < 2 && !player.isDead) {
                player.die()
            }
            player.collidingWithPlatformCounter = 0
            player.platformVelocity = this.velocity.x
        }
    }

    handleCollisionX(player) {
        // sometimes a bug where you can go through the platform, but only at the start of the level
        player.platformVelocityX = this.velocity.x
        player.platformVelocityY = this.velocity.y
        // if left of left side of that object last frame
        if (
            player.previous.position.x - player.previous.velocity.x <=
            this.position.x - player.width - this.velocity.x
        ) {
            // set the player left of this object, reset the velocities, relevant flags and relevant counters and set collidedRight to true
            player.position.x = this.position.x - player.width

            // do additional collision logic

            if (player.collidedX === true && !player.isDead) {
                player.die()
            }

            player.velocity.x = this.velocity.x
            player.collidingWithPlatformCounter = 0
            player.platformVelocity = this.velocity.x
            player.collidedRight = true
            player.collidedRightCounter = 0
        }
        // if right of right side of that object last frame
        if (
            player.previous.position.x - player.previous.velocity.x >=
            this.position.x + this.width - this.velocity.x
        ) {
            // set the player right of this object, reset the velocities, relevant flags and relevant counters and set collidedLeft to true
            player.position.x = this.position.x + this.width

            // do additional collision logic

            if (player.collidedX === true && !player.isDead) {
                player.die()
            }

            player.velocity.x = this.velocity.x
            player.collidingWithPlatformCounter = 0
            player.platformVelocity = this.velocity.x
            player.collidedLeft = true
            player.collidedLeftCounter = 0
        }
    }

    revertYCollision(player) {
        // do additional reversion logic
        this.isActive = 0

        player.standingOnMovingPlatform = false
        player.collidingWithPlatformCounter = 10

        player.velocity.x = this.playerPreviousVelocityX
        player.platformVelocity = 0
    }

    action() {
        this.isActive -= 1

        if (this.traveledX >= this.maxX) {
            this.velocity.x = -this.velocity.x
            this.traveledX = 0
            this.steppedOn = false
        }

        if (this.traveledY >= this.maxY) {
            this.velocity.y = -this.velocity.y
            this.traveledY = 0
            this.steppedOn = false
        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.traveledX += Math.abs(this.velocity.x)
        this.traveledY += Math.abs(this.velocity.y)

        if (this.isActive < 0) {
            this.steppedOn = false
        }
    }

    draw(ctx) {
        this.sprite.draw(ctx, 0, 0, this.position)
        // ctx.beginPath()
        // ctx.rect(this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = "cyan"
        // ctx.fill()
        // ctx.closePath()
    }
}
