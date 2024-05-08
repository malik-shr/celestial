import Element from "./element"
import { keysPressed } from "../listener/store"
import SolidBlock from "./solidBlock"
import JumpPad from "./jumpPad"

export default class Player extends Element {
    velocity
    gravity

    pressingDown
    pressingUp
    pressingRight
    pressingLeft

    isJumping
    isGrounded
    isWallClimbing
    canDash

    collidedDown
    collidedUp
    collidedRight
    collidedLeft
    collidedObjects
    collisionCounter

    level
    camera
    cameraBox

    constructor(x, y, level) {
        // position x,y size x,y
        super(x, y, 1, 1)

        this.level = level

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.cameraBox = {
            position: {
                x: 0,
                y: 0,
            },

            width: 600,
            height: 160,
        }

        this.isJumping = false
        this.isGrounded = false
        this.isWallClimbing = false
        this.canDash = false
        this.collidedObjects = []

        this.WallclimbCounter = 0
        this.collisionCounter = 0
        this.gravity = 0
        this.DashCounter = 0
    }

    changeVelocities() {
        // gravity
        this.velocity.y += this.level.gravity
        this.gravity += this.level.gravity

        // entschleunigung wenn man weder nach rechts noch nach links drückt
        if (!keysPressed.get("ArrowRight") && !keysPressed.get("ArrowLeft")) {
            this.velocity.x -= this.velocity.x / 5
        }

        // richtung ändern auf dem Boden ist instant
        if (
            (keysPressed.get("ArrowRight") && this.velocity.x < 0 && this.isGrounded) ||
            (keysPressed.get("ArrowLeft") && this.velocity.x > 0 && this.isGrounded)
        ) {
            this.velocity.x = 0
        }

        // zusätzlich beschleunigung wenn man die jeweilige taste drückt
        if (keysPressed.get("ArrowRight")) {
            if (this.velocity.x < 8) {
                this.velocity.x += 0.8
            }
        }

        if (keysPressed.get("ArrowLeft")) {
            if (this.velocity.x > -8) {
                this.velocity.x -= 0.8
            }
        }

        // für einen wallclimb muss der Spieler mit der Wand collidieren und es muss d gedrückt sein und er darf nicht seit länger als 50 frames am wallclimben sein
        if (
            (this.collidedLeft === true || this.collidedRight === true) &&
            keysPressed.get("d") &&
            this.WallclimbCounter < 50
        ) {
            this.velocity.y = 0
            this.gravity = 0
            this.isWallClimbing = true
            this.WallclimbCounter += 1
        } else {
            this.isWallClimbing = false
        }

        // wenn man wallclimbed und nach oben drückt kletter der spieler langsam hoch
        if (keysPressed.get("ArrowUp")) {
            if (this.isWallClimbing === true) {
                this.velocity.y = -2
            }
        }

        // jump
        if (keysPressed.get(" ") && this.isGrounded === true) {
            this.velocity.y = -15
            this.isJumping = true
        }
        // walljump
        // momentan frame perfect input, buffer einfügen
        // buffer für so einiges einfügen, auch für is Grounded
        // deque?
        // else {
        //     if (
        //         (this.collidedLeft === true || this.collidedRight === true) &&
        //         keysPressed.get(" ") &&
        //         !this.isGrounded
        //     ) {
        //         this.velocity.y = -7
        //         if (this.collidedLeft) {
        //             this.velocity.x = 7
        //             this.WallJumpLeft = true
        //         }
        //         if (this.collidedRight) {
        //             this.velocity.x = -7
        //             this.WallJumpRight = true
        //         }
        //     }
        // }

        // enables variable jump, makes it so you fall down quicker if you let go of spacebar mid jump
        if (
            !keysPressed.get(" ") &&
            this.velocity.y < -this.gravity - 3.2 &&
            this.isJumping === true
        ) {
            this.velocity.y = -this.gravity - 3.2
        }

        // seit dem letzten Dash müssen 100 frames vergangen sein und einmal der Boden berührt wurden sein
        if (keysPressed.get("Shift") && this.canDash === true && this.DashCounter > 100) {
            if (keysPressed.get("ArrowRight")) {
                this.velocity.x = 15
                this.velocity.y = 0
                this.DashCounter = 0
                this.canDash = false
            }
            if (keysPressed.get("ArrowLeft")) {
                this.velocity.x = -15
                this.velocity.y = 0
                this.DashCounter = 0
                this.canDash = false
            }
            if (keysPressed.get("ArrowDown")) {
                this.velocity.y = 15
                this.DashCounter = 0
                this.canDash = false
            }
            if (keysPressed.get("ArrowUp")) {
                this.velocity.y = -15
                this.DashCounter = 0
                this.canDash = false
            }
        }
    }

    /**
     * @returns if there is a collision between element1 and element2
     */
    collision(element1, element2) {
        return (
            element1.position.y > element2.position.y - element1.height &&
            element1.position.y < element2.position.y + element2.height &&
            element2.position.x - element1.width < element1.position.x &&
            element1.position.x < element2.position.x + element2.width
        )
    }

    // Override
    checkCollision() {
        this.collidedObjects = []

        this.isGrounded = false

        this.collidedDown = false
        this.collidedUp = false
        this.collidedRight = false
        this.collidedLeft = false

        // save Attributes at Time of Collision Check
        const currentPositionY = this.position.y
        const currentCameraBoxY = this.cameraBox.position.y
        const currentVelocityY = this.velocity.y
        const currentGravity = this.gravity
        const currentIsJumping = this.isJumping
        const currentIsGrounded = this.isGrounded
        const currentCanDash = this.canDash
        const currentWallClimbCounter = this.WallclimbCounter

        for (const elementItem of this.level.elementList) {
            // checks if player is in an object and depending on its previous position (current position - current velocities) it stops the player at the right position

            if (!(elementItem instanceof SolidBlock)) continue

            if (this.collision(this, elementItem)) {
                elementItem.handleCollisionY(
                    this,
                    currentPositionY,
                    currentVelocityY,
                    currentCameraBoxY,
                    currentGravity,
                    currentIsJumping,
                    currentIsGrounded,
                    currentCanDash,
                    currentWallClimbCounter
                )
            }
        }

        const currentPositionX = this.position.x
        const currentVelocityX = this.velocity.x

        for (const elementItem of this.level.elementList) {
            if (!(elementItem instanceof SolidBlock)) continue

            if (this.collision(this, elementItem)) {
                elementItem.handleCollisionX(this, currentPositionX, currentVelocityX)
            }
        }

        // if collided on the top or bottom and on the side with an object reset previous collision handling in the y direction and check it again
        if (
            ((this.collidedUp === true || this.collidedDown === true) &&
                this.collidedRight === true) ||
            this.collidedLeft === true
        ) {
            // revert Y collisions
            if (this.collidedObjects.length > 0) {
                // von hinten nach vorne im array
                for (let i = this.collidedObjects.length - 1; i >= 0; i--) {
                    this.collidedObjects[i].revertYCollision(this)
                }
            }

            this.checkYCollision()
        }
    }

    checkYCollision() {
        const currentPositionY = this.position.y
        const currentVelocityY = this.velocity.y

        for (const elementItem of this.level.elementList) {
            if (!(elementItem instanceof SolidBlock)) continue

            if (this.collision(this, elementItem)) {
                // if above that object last frame
                if (currentPositionY - currentVelocityY <= elementItem.position.y - this.height) {
                    elementItem.handleCollisionY(this, currentPositionY, currentVelocityY)
                }
            }
        }
    }

    // Override
    action() {
        this.changeVelocities()

        this.DashCounter += 1

        // debug
        // console.log(this.collisionCounter)
        // this.collisionCounter = 0

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.cameraBox.position.x = this.position.x + this.width / 2 - this.cameraBox.width / 2
        this.cameraBox.position.y = this.position.y + this.height / 2 - this.cameraBox.height / 2
    }

    // Override
    draw(ctx) {
        // Draw cameraBox
        ctx.beginPath()
        ctx.rect(
            this.cameraBox.position.x,
            this.cameraBox.position.y,
            this.cameraBox.width,
            this.cameraBox.height
        )
        ctx.fillStyle = `rgba(255, 255, 255, 0.2)`
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }
}
