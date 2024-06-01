import Element from "./element"

export default class MovingPlatform extends Element {
    constructor(x, y, relativeWidth = 1, relativeHeight = 1, velocityX = 0, velocityY = 0) {
        super(x, y, relativeWidth, relativeHeight)
        this.velocity = {
            x: velocityX,
            y: velocityY,
        }

        this.isActive = 0
        this.steppedOn = false
    }

    checkCollision(element) {}

    // TODO zerquetschlogik einfügen
    handleCollisionY(player) {
        // if above top of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y <=
            this.position.y - player.height - this.velocity.y
        ) {
            // set the player above this object, reset the velocities, relevant flags and relevant counters and set collidedDown to true
            player.position.y = this.position.y - player.height

            player.velocity.y = 0
            player.gravity = 0
            player.isGrounded = true
            player.isJumping = false
            player.collidedDown = true
            player.canDash = true
            player.WallclimbCounter = 0

            // do additional collision logic

            // save current player velocities
            this.playerPreviousVelocityX = player.velocity.x

            if (player.collidedY === true && !player.isDead) {
                player.die()
            }

            // player x velocity an platform angleichen wenn er auf sie aufkommt
            if (!this.steppedOn) {
                player.velocity.x = this.velocity.x
                player.velocity.y = this.velocity.y
            }

            player.standingOnMovingPlatform = true
            player.collidingWithPlatform = true
            player.platformVelocity = this.velocity.x
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
            player.position.y = this.position.y + this.height + this.velocity.y

            player.velocity.y = 0
            player.gravity = 0
            player.collidedUp = true
            player.isJumping = false

            // do additional collision logic

            if (player.collidedY === true && !player.isDead) {
                player.die()
            }
            player.collidingWithPlatform = true
            player.platformVelocity = this.velocity.x
        }
    }

    handleCollisionX(player) {
        // sometimes a bug where you can go through the platform, but only at the start of the level

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
            player.collidingWithPlatform = true
            player.platformVelocity = this.velocity.x
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
            player.collidingWithPlatform = true
            player.platformVelocity = this.velocity.x
        }
    }

    revertYCollision(player) {
        // do additional reversion logic
        this.isActive = 0

        player.standingOnMovingPlatform = false
        player.collidingWithPlatform = false

        player.velocity.x = this.playerPreviousVelocityX
        player.platformVelocity = 0
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
