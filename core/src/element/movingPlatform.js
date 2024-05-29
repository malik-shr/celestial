import Element from "./element"

export default class MovingPlatform extends Element {
    constructor(x, y, relativeWidth = 1, relativeHeight = 1, velocityX = 0, velocityY = 0) {
        super(x, y, relativeWidth, relativeHeight)
        this.velocity = {
            x: velocityX,
            y: velocityY,
        }

        this.activeFrames = 0
        this.isActive = 0
        this.steppedOn = false
    }

    checkCollision(element) {}

    // TODO zerquetschlogik einfügen
    handleCollisionY(player) {
        // if above top of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y + this.velocity.y <=
            this.position.y - player.height
        ) {
            // set the player above this object, reset the velocities, relevant flags and relevant counters and set collidedDown to true
            player.position.y = this.position.y - player.height + this.velocity.y

            player.camerabox.position.y =
                player.position.y + player.height / 2 - player.camerabox.height / 2

            player.velocity.y = 0
            player.gravity = 0
            player.isGrounded = true
            player.isJumping = false
            player.collidedDown = true
            player.canDash = true
            player.WallclimbCounter = 0

            // save current player velocities
            this.previousVelocityX = player.velocity.x

            // do additional collision logic

            // player x velocity an platform angleichen wenn er auf sie aufkommt
            if (!this.steppedOn) {
                player.velocity.x = this.velocity.x
                player.velocity.y = this.velocity.y
            }

            player.standingOnMovingPlatform = true
            player.PlatformVelocity = this.velocity.x
            this.steppedOn = true

            this.isActive = 1

            // save the object reference in case of reset
            player.collidedSpecialObjects.push(this)
        }

        // if below bottom of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y >=
            this.position.y + this.height
        ) {
            // set the player below this object, reset the velocities, relevant flags and relevant counters and set collidedUp to true
            player.position.y = this.position.y + this.height + this.velocity.y

            player.camerabox.position.y =
                player.position.y + player.height / 2 - player.camerabox.height / 2

            player.velocity.y = 0
            player.gravity = 0
            player.collidedUp = true
            player.isJumping = false
        }
    }

    handleCollisionX(player) {
        // if left of left side of that object last frame
        if (
            player.previous.position.x - player.previous.velocity.x - this.velocity.x <=
            this.position.x - player.width
        ) {
            // set the player left of this object, reset the velocities, relevant flags and relevant counters and set collidedRight to true
            player.position.x = this.position.x - player.width + this.velocity.x

            player.camerabox.position.x =
                player.position.x + player.width / 2 - player.camerabox.width / 2

            player.velocity.x = 0

            player.collidedRight = true
            player.collisionCounter += 1
        }
        // if right of right side of that object last frame
        if (
            player.previous.position.x - player.previous.velocity.x + this.velocity.x >=
            this.position.x + this.width
        ) {
            // set the player right of this object, reset the velocities, relevant flags and relevant counters and set collidedLeft to true
            player.position.x = this.position.x + this.width + this.velocity.x

            player.camerabox.position.x =
                player.position.x + player.width / 2 - player.camerabox.width / 2

            player.velocity.x = 0
            player.collidedLeft = true
        }
    }

    revertYCollision(player) {
        // do additional reversion logic
        this.activeFrames = 0
        this.isActive = 0

        player.standingOnMovingPlatform = false

        player.velocity.x = this.previousVelocityX
    }

    action() {
        this.isActive -= 1

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.isActive < -1) {
            this.steppedOn = false
        }

        // console.log(this.steppedOn)
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "cyan"
        ctx.fill()
        ctx.closePath()
    }
}
