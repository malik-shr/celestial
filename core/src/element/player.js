import Element from "./element"
import { keysPressed } from "../listener/store"

export default class Player extends Element {
    constructor(x, y, level) {
        super(x, y, 1, 1)

        this.level = level
        this.previous = null

        this.gravity = 0
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.camerabox = {
            position: {
                x: 0,
                y: 0,
            },

            width: 600,
            height: 300,
        }

        this.isJumping = false
        this.isGrounded = false
        this.isWallClimbing = false
        this.canDash = false

        this.platformVelocity = 0

        this.standingOnMovingPlatform = false
        this.collidedDown = false
        this.collidedUp = false
        this.collidedRight = false
        this.collidedLeft = false
        this.collidedSpecialObjects = []

        this.wallclimbCounter = 0
        this.collisionCounter = 0

        this.dashCounter = 0
    }

    action() {
        this.changeVelocities()

        this.dashCounter += 1

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.camerabox.position.x = this.position.x + this.width / 2 - this.camerabox.width / 2
        this.camerabox.position.y = this.position.y + this.height / 2 - this.camerabox.height / 2
    }

    draw(ctx) {
        // Draw camerabox
        ctx.beginPath()
        ctx.rect(
            this.camerabox.position.x,
            this.camerabox.position.y,
            this.camerabox.width,
            this.camerabox.height
        )
        ctx.fillStyle = `rgba(255, 255, 255, 0.2)`
        ctx.fill()
        ctx.closePath()

        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        // if player is unable to dash color him pink
        if (this.canDash && this.dashCounter >= 100) {
            ctx.fillStyle = "red"
        } else {
            ctx.fillStyle = "pink"
        }
        ctx.fill()
        ctx.closePath()
    }

    changeVelocities() {
        const maxSpeedX = 8

        // gravity
        this.velocity.y += this.level.gravity
        this.gravity += this.level.gravity

        // entschleunigung wenn man weder nach rechts noch nach links drückt
        if (
            !keysPressed.get("ArrowRight") &&
            !keysPressed.get("ArrowLeft") &&
            !this.standingOnMovingPlatform
        ) {
            this.velocity.x = 0
        }

        // entschleunigung auf die platform velocity falls der Spieler auf einer steht
        if (
            !keysPressed.get("ArrowRight") &&
            !keysPressed.get("ArrowLeft") &&
            this.standingOnMovingPlatform
        ) {
            this.velocity.x = this.platformVelocity
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
            if (this.velocity.x < maxSpeedX) {
                this.velocity.x += 0.8
            }
        }

        if (keysPressed.get("ArrowLeft")) {
            if (this.velocity.x > -maxSpeedX) {
                this.velocity.x -= 0.8
            }
        }

        // für einen wallclimb muss der Spieler mit der Wand collidieren und es muss d gedrückt sein und er darf nicht seit länger als 50 frames am wallclimben sein
        if (
            (this.collidedLeft === true || this.collidedRight === true) &&
            keysPressed.get("d") &&
            this.wallclimbCounter < 50
        ) {
            this.velocity.y = 0
            this.gravity = 0
            this.isWallClimbing = true
            this.wallclimbCounter += 1
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
        if (keysPressed.get("Shift") && this.canDash === true && this.dashCounter > 100) {
            if (keysPressed.get("ArrowRight")) {
                this.velocity.x = 15
                this.velocity.y = 0
                this.dashCounter = 0
                this.canDash = false
            }
            if (keysPressed.get("ArrowLeft")) {
                this.velocity.x = -15
                this.velocity.y = 0
                this.dashCounter = 0
                this.canDash = false
            }
            if (keysPressed.get("ArrowDown")) {
                this.velocity.y = 15
                this.dashCounter = 0
                this.canDash = false
            }
            if (keysPressed.get("ArrowUp")) {
                this.velocity.y = -15
                this.dashCounter = 0
                this.canDash = false
            }
        }
    }

    // Override
    checkCollision() {
        this.resetCollisionState()

        this.previous = this.clone()

        for (const elementItem of this.level.elementList) {
            if (this.isColliding(this, elementItem)) {
                elementItem.handleCollisionY(this)
            }
        }

        for (const elementItem of this.level.elementList) {
            if (this.isColliding(this, elementItem)) {
                elementItem.handleCollisionX(this)
            }
        }

        // if collided vertically AND horizontally, revert the vertical collision handling and check it again
        if (
            ((this.collidedUp === true || this.collidedDown === true) &&
                this.collidedRight === true) ||
            this.collidedLeft === true
        ) {
            this.revertYCollision()

            // revert specific collision logic (like that of the jumppad)
            if (this.collidedSpecialObjects.length > 0) {
                // von hinten nach vorne im array
                for (let i = this.collidedSpecialObjects.length - 1; i >= 0; i--) {
                    this.collidedSpecialObjects[i].revertYCollision(this)
                }
            }

            // check it again
            this.checkYCollision()
        }
    }

    checkYCollision() {
        this.previous = this.clone()

        for (const elementItem of this.level.elementList) {
            if (this.isColliding(this, elementItem)) {
                elementItem.handleCollisionY(this)
            }
        }
    }

    resetCollisionState() {
        this.collidedSpecialObjects = []

        this.isGrounded = false
        this.standingOnMovingPlatform = false

        this.collidedDown = false
        this.collidedUp = false
        this.collidedRight = false
        this.collidedLeft = false
    }

    revertYCollision() {
        this.position.y = this.previous.position.y
        this.velocity.y = this.previous.velocity.y
        this.gravity = this.previous.gravity
        this.camerabox.position.y = this.previous.camerabox.position.y
        this.isJumping = this.previous.isJumping
        this.isGrounded = this.previous.isGrounded
        this.canDash = this.previous.canDash
        this.wallclimbCounter = this.previous.wallclimbCounter
        this.collidedDown = false
        this.collidedUp = false
    }

    /** @returns if player is in an element */
    isColliding(element1, element2) {
        const belowTop = element1.position.y > element2.position.y - element1.height
        const aboveBottom = element1.position.y < element2.position.y + element2.height
        const rightOrLeft = element2.position.x - element1.width < element1.position.x
        const leftOrRight = element1.position.x < element2.position.x + element2.width

        return belowTop && aboveBottom && rightOrLeft && leftOrRight && element1 !== element2
    }

    /** @returns players state at the time of function call */
    clone() {
        return {
            position: structuredClone(this.position),
            velocity: structuredClone(this.velocity),
            camerabox: structuredClone(this.camerabox),
            gravity: this.gravity,

            isJumping: this.isJumping,
            isGrounded: this.isGrounded,
            canDash: this.canDash,
            wallclimbCounter: this.wallclimbCounter,
        }
    }
}
