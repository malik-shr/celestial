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
    goneUp
    collidedDown
    collidedUp
    collidedRight
    collidedLeft
    collisionCounter

    level
    camera
    cameraBox

    width = 32
    height = 32

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
        this.goneUp = false
        this.WallclimbCounter = 0
        this.collisionCounter = 0
        this.gravity = 0
        this.DashCounter = 0
    }

    changeVelocities() {
        // andere Tasten für Movement würde ich sagen

        // gravity
        this.velocity.y += this.level.gravity
        this.gravity += this.level.gravity

        this.pressingDown = false
        this.pressingUp = false
        this.pressingRight = false
        this.pressingLeft = false

        // entschleunigung wenn man die jeweilige taste nicht drückt oder man die richtung von links nach rechts oder von rechts nach links wechselt
        if (
            (!keysPressed.get("ArrowRight") && !keysPressed.get("ArrowLeft")) ||
            (keysPressed.get("ArrowRight") && this.velocity.x < 0) ||
            (keysPressed.get("ArrowLeft") && this.velocity.x > 0)
        ) {
            this.velocity.x = 0
        }

        // set flag if pressed
        if (keysPressed.get("ArrowDown")) {
            this.pressingDown = true
        }

        if (keysPressed.get("ArrowUp")) {
            if (this.isWallClimbing === true) {
                this.velocity.y = -2
                this.goneUp = true
            }
            this.pressingUp = true
        }

        // zusätzlich beschleunigung wenn man die jeweilige taste drückt
        if (keysPressed.get("ArrowRight")) {
            this.pressingRight = true
            if (this.velocity.x < 8) {
                this.velocity.x += 0.8
            }
        }

        if (keysPressed.get("ArrowLeft")) {
            this.pressingLeft = true
            if (this.velocity.x > -8) {
                this.velocity.x -= 0.8
            }
        }

        // wallclimb
        if (
            (this.collidedLeft === true || this.collidedRight === true) &&
            (this.pressingLeft === true || this.pressingRight === true) &&
            (this.velocity.y < -2 || this.velocity.y > 2 || this.isWallClimbing === true)
        ) {
            if ((!this.isWallClimbing || !this.goneUp) && this.WallclimbCounter < 100) {
                this.velocity.y = 0
            }
            this.gravity = 0
            if (!this.isWallClimbing) {
                this.WallclimbCounter = 0
            }
            this.isWallClimbing = true
        }

        if (keysPressed.get(" ") && this.isGrounded === true) {
            this.velocity.y = -15
            this.isJumping = true
        }

        // enables variable jump, makes it so you fall down quicker if you let go of spacebar mid jump
        if (
            !keysPressed.get(" ") &&
            this.velocity.y < -this.gravity - 3.2 &&
            this.isJumping === true
        ) {
            this.velocity.y = -this.gravity - 3.2
        }

        // seit dem letzten Dash müssen 50 frames vergangen sein und einmal der Boden berührt wurden sein
        if (keysPressed.get("Shift") && this.canDash === true && this.DashCounter > 50) {
            if (this.pressingDown === true) {
                this.velocity.y = 15
                this.DashCounter = 0
                this.canDash = false
            }
            if (this.pressingUp === true) {
                this.velocity.y = -15
                this.DashCounter = 0
                this.canDash = false
            }
            if (this.pressingRight === true) {
                this.velocity.x = 12
                this.DashCounter = 0
                this.canDash = false
            }
            if (this.pressingLeft === true) {
                this.velocity.x = -12
                this.DashCounter = 0
                this.canDash = false
            }
        }
    }

    // Override
    checkCollision() {
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
        const currentIsWallClimbing = this.isWallClimbing
        const currentGoneUp = this.goneUp
        const currentWallClimbCounter = this.WallclimbCounter

        let activatedObjectsY = []

        for (const elementItem of this.level.elementList) {
            // checks if player is in an object and depending on its previous position (current position - current velocities) it stops the player at the right position

            // Problematisch wenn ein Block den Spieler in einen anderen setzt

            // if inside an object:
            // inside upper bound: this.position.y > elementItem.position.y-this.sizeY*32 &&
            // inside lower bound: this.position.y < elementItem.position.y + elementItem.sizeY*32 &&
            // inside left  bound: elementItem.position.x-this.sizeX*32 < this.position.x &&
            // inside right bound: this.position.x < elementItem.position.x+elementItem.sizeX*32
            if (
                elementItem instanceof SolidBlock &&
                this.position.y > elementItem.position.y - this.sizeY * 32 &&
                this.position.y < elementItem.position.y + elementItem.sizeY * 32 &&
                elementItem.position.x - this.sizeX * 32 < this.position.x &&
                this.position.x < elementItem.position.x + elementItem.sizeX * 32
            ) {
                // if above that object last frame
                if (
                    currentPositionY - currentVelocityY <=
                    elementItem.position.y - this.sizeY * 32
                ) {
                    this.position.y = elementItem.position.y - this.sizeY * 32

                    this.cameraBox.position.y =
                        this.position.y + this.height / 2 - this.cameraBox.height / 2

                    this.velocity.y = 0
                    this.gravity = 0
                    this.isGrounded = true
                    this.collidedDown = true
                    this.canDash = true
                    this.isWallClimbing = false
                    this.goneUp = false
                    this.collisionCounter += 1

                    if (elementItem instanceof JumpPad) {
                        this.velocity.y = -20
                        this.isJumping = false

                        elementItem.isActive = true

                        // save the object reference in case of reset
                        activatedObjectsY.push(elementItem)
                    }
                }

                // if below that object last frame
                if (
                    currentPositionY - currentVelocityY >=
                    elementItem.position.y + elementItem.sizeY * 32
                ) {
                    this.position.y = elementItem.position.y + elementItem.sizeY * 32

                    this.cameraBox.position.y =
                        this.position.y + this.height / 2 - this.cameraBox.height / 2

                    this.velocity.y = 0
                    this.gravity = 0
                    this.collidedUp = true
                    this.collisionCounter += 1
                }
            }
        }

        const currentPositionX = this.position.x
        const currentVelocityX = this.velocity.x

        for (const elementItem of this.level.elementList) {
            if (
                elementItem instanceof SolidBlock &&
                this.position.y > elementItem.position.y - this.sizeY * 32 &&
                this.position.y < elementItem.position.y + elementItem.sizeY * 32 &&
                elementItem.position.x - this.sizeX * 32 < this.position.x &&
                this.position.x < elementItem.position.x + elementItem.sizeX * 32
            ) {
                // if left of that object last frame
                if (
                    currentPositionX - currentVelocityX <=
                    elementItem.position.x - this.sizeX * 32
                ) {
                    this.position.x = elementItem.position.x - this.sizeX * 32

                    this.cameraBox.position.x =
                        this.position.x + this.width / 2 - this.cameraBox.width / 2

                    this.velocity.x = 0

                    this.collidedRight = true
                    this.collisionCounter += 1
                }
                // if right of that object last frame
                if (
                    currentPositionX - currentVelocityX >=
                    elementItem.position.x + elementItem.sizeX * 32
                ) {
                    this.position.x = elementItem.position.x + elementItem.sizeX * 32

                    this.cameraBox.position.x =
                        this.position.x + this.width / 2 - this.cameraBox.width / 2

                    this.velocity.x = 0
                    this.collidedLeft = true
                    this.collisionCounter += 1
                }
            }
        }

        // if collided on the top or bottom and on the side with an object reset previous collision handling in the y direction and check it again
        if (
            ((this.collidedUp === true || this.collidedDown === true) &&
                this.collidedRight === true) ||
            this.collidedLeft === true
        ) {
            this.position.y = currentPositionY
            this.velocity.y = currentVelocityY
            this.gravity = currentGravity
            this.cameraBox.position.y = currentCameraBoxY
            this.isJumping = currentIsJumping
            this.isGrounded = currentIsGrounded
            this.canDash = currentCanDash
            this.isWallClimbing = currentIsWallClimbing
            this.goneUp = currentGoneUp
            this.collidedDown = false
            this.collidedUp = false

            // reset activated objects
            if (activatedObjectsY.length > 0) {
                for (let i = 0; i < activatedObjectsY.length; i++) {
                    activatedObjectsY[i].isActive = false
                }
            }

            this.checkYCollision()
        }
    }

    checkYCollision() {
        const currentPositionY = this.position.y
        const currentVelocityY = this.velocity.y

        for (const elementItem of this.level.elementList) {
            if (
                elementItem instanceof SolidBlock &&
                this.position.y > elementItem.position.y - this.sizeY * 32 &&
                this.position.y < elementItem.position.y + elementItem.sizeY * 32 &&
                elementItem.position.x - this.sizeX * 32 < this.position.x &&
                this.position.x < elementItem.position.x + elementItem.sizeX * 32
            ) {
                // if above that object last frame
                if (
                    currentPositionY - currentVelocityY <=
                    elementItem.position.y - this.sizeY * 32
                ) {
                    this.position.y = elementItem.position.y - this.sizeY * 32

                    this.cameraBox.position.y =
                        this.position.y + this.height / 2 - this.cameraBox.height / 2

                    this.velocity.y = 0
                    this.gravity = 0
                    this.isGrounded = true
                    this.collidedDown = true
                    this.canDash = true
                    this.isWallClimbing = false
                    this.goneUp = false
                    this.collisionCounter += 1

                    if (elementItem instanceof JumpPad) {
                        this.velocity.y = -20
                        this.isJumping = false

                        elementItem.isActive = true
                    }
                }

                // if below that object last frame
                if (
                    currentPositionY - currentVelocityY >=
                    elementItem.position.y + elementItem.sizeY * 32
                ) {
                    this.position.y = elementItem.position.y + elementItem.sizeY * 32

                    this.cameraBox.position.y =
                        this.position.y + this.height / 2 - this.cameraBox.height / 2

                    this.velocity.y = 0
                    this.gravity = 0
                    this.collidedUp = true
                    this.collisionCounter += 1
                }
            }
        }
    }

    // Override
    action() {
        this.changeVelocities()

        this.WallclimbCounter += 1
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
        ctx.rect(this.position.x, this.position.y, this.sizeX * 32, this.sizeY * 32)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }
}
