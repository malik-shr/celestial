import Element from "./element"
import Sprite from "./sprite"

export default class SolidBlock extends Element {
    constructor(x, y) {
        super(x, y)

        this.sprite = new Sprite("tileset.png", this.width, this.height, 47, 48)
    }

    action() {}

    checkCollision(element) {}

    handleCollisionY(player) {
        player.collidedY = true
        // if above top of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y <=
            this.position.y - player.height
        ) {
            // set the player above this object, reset the velocities, relevant flags and relevant counters and set collidedDown to true
            player.position.y = this.position.y - player.height

            player.velocity.y = 0
            player.gravity = 0
            player.isGrounded = true
            player.notGroundedCounter = 0
            player.isJumping = false
            player.collidedDown = true
            player.canDash = true
            player.WallclimbCounter = 0

            this.WallJumpRightCounter = 50
            this.WallJumpLeftCounter = 50
            player.collidedDownCounter = 0
        }

        // if below bottom of element last frame
        if (
            player.previous.position.y - player.previous.velocity.y >=
            this.position.y + this.height
        ) {
            // set the player below this object, reset the velocities, relevant flags and relevant counters and set collidedUp to true
            player.position.y = this.position.y + this.height

            player.velocity.y = 0
            player.gravity = 0
            player.collidedUp = true
            player.collidedUpCounter = 0
            player.isJumping = false
        }
    }

    handleCollisionX(player) {
        player.collidedX = true
        // if left of left side of that object last frame
        if (
            player.previous.position.x - player.previous.velocity.x <=
            this.position.x - player.width
        ) {
            // set the player left of this object, reset the velocities, relevant flags and relevant counters and set collidedRight to true
            player.position.x = this.position.x - player.width

            player.velocity.x = 0

            player.collidedRight = true
            player.collidedRightCounter = 0
        }
        // if right of right side of that object last frame
        if (
            player.previous.position.x - player.previous.velocity.x >=
            this.position.x + this.width
        ) {
            // set the player right of this object, reset the velocities, relevant flags and relevant counters and set collidedLeft to true
            player.position.x = this.position.x + this.width

            player.velocity.x = 0
            player.collidedLeft = true
            player.collidedLeftCounter = 0
        }
    }

    draw(ctx) {
        this.sprite.draw(ctx, 1, 1, this.position)
    }
}
