import Element from "./element"
import { keysPressed } from "../listener/store"
import Sprite from "./sprite"

// import pixilartSprite from "D:/Uni/Projektseminar/core/public/pixilartSprite.png"

export default class Player extends Element {
    constructor(x, y, level) {
        super(x, y, 1, 1)

        this.level = level
        this.previous = null

        this.width = 32
        this.height = 35

        this.gravity = 0
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.isJumping = false
        this.isGrounded = false
        this.isWallClimbing = false
        this.canDash = false
        this.isDashing = false

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

        // ------Variables for sprite
        this.isMovingRight = true
        this.playerImage = new Sprite("pixilartSprite.png", 70, 70)
        this.standRight = new Sprite("standingRight.png", 70, 70)
        this.standLeft = new Sprite("StandingLeft.png", 70, 70)
        this.runRight = new Sprite("pixilartSprite.png", 70, 70)
        this.runLeft = new Sprite("pixilartSpriteLeft.png", 70, 70)
        this.jumpRight = new Sprite("jumpRight.png", 70, 70)
        this.jumpUp = new Sprite("jumpUp.png", 70, 70)
        this.airTimeUp = new Sprite("airTimeUp.png", 70, 70)
        this.jumpUpLeft = new Sprite("jumpUpLeft.png", 70, 70)
        this.airTimeLeft = new Sprite("airTimeLeft.png", 70, 70)

        this.dashJumpUpRight = new Sprite("dashJumpUpRight.png", 70, 70)
        this.dashJumpUpLeft = new Sprite("dashJumpUpLeft.png", 70, 70)
        this.airTimeDashLeft = new Sprite("airTimeDashLeft.png", 70, 70)
        this.airTimeDashRight = new Sprite("airTimeDashRight.png", 70, 70)
        // this.playerImage.img.src = "pixilartSprite.png"
        // this.runRight.img.src = "pixilartSprite.png"
        // this.runLeft.img.src = "pixilartSpriteLeft.png"
        // this.standRight.img.src = "standingRight.png"
        // this.standLeft.img.src = "StandingLeft.png"
        // this.jumpRight.img.src = "jumpRight.img.png"
        // this.jumpUp.img.src = "jumpUp.img.png"
        // this.airTimeUp.img.src = "airTimeUp.img.png"
        // this.jumpUpLeft.img.src = "jumpUpLeft.img.png"
        // this.airTimeLeft.img.src = "airTimeLeft.img.png"

        this.playerImage.img.onload = () => {
            this.loaded = true
        }

        this.frameRate = 8
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 4

        this.sprites = {
            stand: {
                right: this.standRight,
                left: this.standLeft,
                frames: (this.frameRate = 8),
                buffer: (this.frameBuffer = 1),
            },
            run: {
                right: this.runRight,
                left: this.runLeft,
                frames: (this.frameRate = 8),
                buffer: (this.frameBuffer = 3),
            },
            jump: {
                right: this.jumpUp,
                up: this.jumpUp,
                dashRight: this.dashJumpUpRight,
                dashLeft: this.dashJumpUpLeft,
                left: this.jumpUpLeft,
                frames: (this.frameRate = 8),
                buffer: (this.frameBuffer = 2),
            },
            fall: {
                right: this.airTimeUp,
                left: this.airTimeLeft,
                dashRight: this.airTimeDashRight,
                dashLeft: this.airTimeDashLeft,
                frames: (this.frameRate = 8),
                buffer: (this.frameBuffer = 5),
            },
        }

        this.currentSprite = this.sprites.stand.right
        this.previousSprite = this.sprites.stand.right
        this.currentSpriteFrames = this.sprites.stand.frames
        this.currentFrameBuffer = this.sprites.stand.buffer
    }

    action() {
        this.changeVelocities()

        this.dashCounter += 1

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

    draw(ctx) {
        ctx.beginPath()

        if (!this.currentSprite.loaded) return

        this.currentSprite.draw(ctx, this.currentFrame, this.position, this.width, this.height)

        this.updateFrames()

        console.log("velocity x: " + this.velocity.x)
        console.log("velocity y: " + this.velocity.y)
        console.log(this.currentSprite.img)
        console.log("grounded: " + this.isGrounded)
        console.log("falling: " + this.falling)
        console.log("Dash: " + this.isDashing)

        // if player is unable to dash color him pink
        if (this.canDash && this.dashCounter >= 5) {
            ctx.fillStyle = "red"
        } else {
            this.currentSprite = this.sprites.jump.right
        }
        ctx.fill()
        ctx.closePath()
    }

    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.currentFrameBuffer === 0) {
            if (this.jummping) {
                // Only iterate once when jumping
                if (this.currentFrame < this.currentSpriteFrames - 1) {
                    this.currentFrame++
                }
            } else {
                if (this.currentFrame < this.currentSpriteFrames - 1) this.currentFrame++
                else this.currentFrame = 0
            }
        }
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

        // Sprite animation for standing still
        if (this.velocity.x === 0 && this.isGrounded) {
            if (this.isMovingRight) {
                this.currentSprite = this.sprites.stand.right
            } else {
                this.currentSprite = this.sprites.stand.left
            }
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
                this.velocity.x += 0.4
                this.isMovingRight = true
            }
        }
        // sprite animation for moving right on the ground when pressing the right key
        if (
            keysPressed.get("ArrowRight") &&
            this.isGrounded &&
            this.falling === false &&
            !this.standingOnMovingPlatform
        ) {
            this.currentSprite = this.sprites.run.right
            this.currentSpriteFrames = this.sprites.run.frames
            this.currentFrameBuffer = this.sprites.run.buffer
        }
        // Left Movement
        if (keysPressed.get("ArrowLeft")) {
            if (this.velocity.x > -maxSpeedX) {
                this.velocity.x -= 0.4
                this.isMovingRight = false
            }
        }
        // sprite animation for moving left on the ground when pressing the left key
        if (
            keysPressed.get("ArrowLeft") &&
            this.isGrounded &&
            this.falling === false &&
            !this.standingOnMovingPlatform
        ) {
            this.currentSprite = this.sprites.run.left
            this.currentSpriteFrames = this.sprites.run.frames
            this.currentFrameBuffer = this.sprites.run.buffer
        }

        // jump
        if (keysPressed.get(" ") && this.isGrounded === true) {
            this.velocity.y -= 15
            this.isJumping = true
            this.jummping = true
        }

        // Check if the player is falling
        if (this.isGrounded === false && this.velocity.y > 0) this.falling = true
        else this.falling = false

        //jummping Animation
        if (this.velocity.y <= 0 && !this.isGrounded) {
            if (this.isMovingRight) {
                if (this.isDashing) {
                    this.currentSprite = this.sprites.jump.dashRight
                } else this.currentSprite = this.sprites.jump.right
            } else if (this.isDashing) {
                this.currentSprite = this.sprites.jump.dashLeft
            } else this.currentSprite = this.sprites.jump.left

            this.currentSpriteFrames = this.sprites.jump.frames
            this.currentFrameBuffer = this.sprites.jump.buffer
            this.jummping = true
        }

        //falling animation
        if (this.falling) {
            if (this.isMovingRight) {
                if (this.isDashing) {
                    this.currentSprite = this.sprites.fall.dashRight
                } else this.currentSprite = this.sprites.fall.right
            } else if (this.isDashing) {
                this.currentSprite = this.sprites.fall.dashLeft
            } else this.currentSprite = this.sprites.fall.left
            this.currentFrameBuffer = this.sprites.fall.buffer
            this.jummping = false
        }

        // player stands still when both left and right key are pressed
        if (keysPressed.get("ArrowLeft") && keysPressed.get("ArrowRight")) {
            if (this.jummping) {
                this.currentSprite = this.sprites.jump.right
                this.currentSpriteFrames = this.sprites.jump.frames
                this.currentFrameBuffer = this.sprites.jump.buffer
            } else if (this.falling) {
                this.currentSprite = this.sprites.fall.right
                this.currentFrameBuffer = this.sprites.fall.buffer
            } else this.currentSprite = this.sprites.stand.right
        }

        if (this.isGrounded && this.dashCounter > 40) {
            this.isDashing = false
        }
        if (
            (this.collidedLeft === true || this.collidedRight === true) &&
            keysPressed.get("d") &&
            this.wallclimbCounter < 50
        ) {
            // für einen wallclimb muss der Spieler mit der Wand collidieren und es muss d gedrückt sein und er darf nicht seit länger als 50 currentFrame am wallclimben sein
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

        //Acceleration stops after not pressing keys, it should continue and gradually stop
        // dashing diagonaly has is like dashing up and dashing right

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
        //             this.WalljumpRight.img = true
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

        // seit dem letzten Dash müssen 100 currentFrame vergangen sein und einmal der Boden berührt wurden sein
        if (keysPressed.get("Shift") && this.canDash === true && this.dashCounter > 40) {
            if (keysPressed.get("ArrowRight")) {
                this.velocity.x = 15
                this.velocity.y = 0
                this.dashCounter = 0
                this.canDash = false
                this.isDashing = true
            }
            if (keysPressed.get("ArrowLeft")) {
                this.velocity.x = -15
                this.velocity.y = 0
                this.dashCounter = 0
                this.canDash = false
                this.isDashing = true
            }
            if (keysPressed.get("ArrowDown")) {
                this.velocity.y = 15
                this.dashCounter = 0
                this.canDash = false
                this.isDashing = true
            }
            if (keysPressed.get("ArrowUp")) {
                this.velocity.y = -15
                this.dashCounter = 0
                this.canDash = false
                this.isDashing = true
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
            gravity: this.gravity,

            isJumping: this.isJumping,
            isGrounded: this.isGrounded,
            canDash: this.canDash,
            wallclimbCounter: this.wallclimbCounter,
        }
    }
}
