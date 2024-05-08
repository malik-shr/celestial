import Element from "./element"

export default class SolidBlock extends Element {
    constructor(x, y, relativeWidth = 1, relativeHeight = 1) {
        super(x, y, relativeWidth, relativeHeight)
    }

    action() {}

    checkCollision(element) {}

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
        this.currentPositionY = currentPositionY
        this.currentCameraBoxY = currentCameraBoxY
        this.currentVelocityY = currentVelocityY
        this.currentGravity = currentGravity
        this.currentIsJumping = currentIsJumping
        this.currentIsGrounded = currentIsGrounded
        this.currentCanDash = currentCanDash
        this.currentWallClimbCounter = currentWallClimbCounter

        // if above that object last frame
        if (currentPositionY - currentVelocityY <= this.position.y - player.height) {
            player.position.y = this.position.y - player.height

            player.cameraBox.position.y =
                player.position.y + player.height / 2 - player.cameraBox.height / 2

            player.velocity.y = 0
            player.gravity = 0
            player.isGrounded = true
            player.isJumping = false
            player.collidedDown = true
            player.canDash = true
            player.WallclimbCounter = 0
            player.collisionCounter += 1

            // save the object reference in case of reset
            player.collidedObjects.push(this)
        }

        // if below that object last frame
        if (currentPositionY - currentVelocityY >= this.position.y + this.height) {
            player.position.y = this.position.y + this.height

            player.cameraBox.position.y =
                player.position.y + player.height / 2 - player.cameraBox.height / 2

            player.velocity.y = 0
            player.gravity = 0
            player.collidedUp = true
            player.isJumping = false
            player.collisionCounter += 1

            // save the object reference in case of reset
            player.collidedObjects.push(this)
        }
    }

    handleCollisionX(player, currentPositionX, currentVelocityX) {
        // if left of that object last frame
        if (currentPositionX - currentVelocityX <= this.position.x - player.width) {
            player.position.x = this.position.x - player.width

            player.cameraBox.position.x =
                player.position.x + player.width / 2 - player.cameraBox.width / 2

            player.velocity.x = 0

            player.collidedRight = true
            player.collisionCounter += 1
        }
        // if right of that object last frame
        if (currentPositionX - currentVelocityX >= this.position.x + this.width) {
            player.position.x = this.position.x + this.width

            player.cameraBox.position.x =
                player.position.x + player.width / 2 - player.cameraBox.width / 2

            player.velocity.x = 0
            player.collidedLeft = true
            player.collisionCounter += 1
        }
    }

    revertYCollision(player) {
        player.position.y = this.currentPositionY
        player.velocity.y = this.currentVelocityY
        player.gravity = this.currentGravity
        player.cameraBox.position.y = this.currentCameraBoxY
        player.isJumping = this.currentIsJumping
        player.isGrounded = this.currentIsGrounded
        player.canDash = this.currentCanDash
        player.collidedDown = false
        player.collidedUp = false
        player.WallclimbCounter = this.currentWallClimbCounter
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "green"
        ctx.fill()
        ctx.closePath()
    }
}
