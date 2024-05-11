import Element from "./element"

export default class SolidBlock extends Element {
    constructor(x, y, relativeWidth = 1, relativeHeight = 1) {
        super(x, y, relativeWidth, relativeHeight)
    }

    action() {}

    checkCollision(element) {}

    handleCollisionY(player) {
        // if above top of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y <=
            this.position.y - player.height
        ) {
            // set the player above this object, reset the velocities, relevant flags and relevant counters and set collidedDown to true
            player.position.y = this.position.y - player.height

            player.camerabox.position.y =
                player.position.y + player.height / 2 - player.camerabox.height / 2

            player.velocity.y = 0
            player.gravity = 0
            player.isGrounded = true
            player.isJumping = false
            player.collidedDown = true
            player.canDash = true
            player.WallclimbCounter = 0
        }

        // if below bottom of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y >=
            this.position.y + this.height
        ) {
            // set the player below this object, reset the velocities, relevant flags and relevant counters and set collidedUp to true
            player.position.y = this.position.y + this.height

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
            player.previous.position.x - player.previous.velocity.x <=
            this.position.x - player.width
        ) {
            // set the player left of this object, reset the velocities, relevant flags and relevant counters and set collidedRight to true
            player.position.x = this.position.x - player.width

            player.camerabox.position.x =
                player.position.x + player.width / 2 - player.camerabox.width / 2

            player.velocity.x = 0

            player.collidedRight = true
            player.collisionCounter += 1
        }
        // if right of right side of that object last frame
        if (
            player.previous.position.x - player.previous.velocity.x >=
            this.position.x + this.width
        ) {
            // set the player right of this object, reset the velocities, relevant flags and relevant counters and set collidedLeft to true
            player.position.x = this.position.x + this.width

            player.camerabox.position.x =
                player.position.x + player.width / 2 - player.camerabox.width / 2

            player.velocity.x = 0
            player.collidedLeft = true
        }
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath()
    }
}
