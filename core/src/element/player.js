import Element from "./element"
import { keysPressed } from "../listener/store"
import Sprite from "./sprite"
import Particles from "../ui/particle"

// import pixilartSprite from "D:/Uni/Projektseminar/core/public/pixilartSprite.png"

export default class Player extends Element {
    constructor(x, y, game, level) {
        super(x, y, 1, 1)

        this.game = game
        this.level = level
        this.previous = null

        this.width = 32
        this.height = 38

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.respawnPoint = structuredClone(this.position)

        // additional velocities
        this.gravity = 0
        this.platformVelocity = 0
        this.platformVelocityX = 0
        this.platformVelocityY = 0

        // status flags
        this.isJumping = false
        this.isWallClimbing = false
        this.isDashing = false
        this.isDead = false
        this.canDash = false

        // collision flags
        this.isGrounded = false
        this.standingOnMovingPlatform = false
        this.collidingWithPlatform = false
        this.collidedDown = false
        this.collidedUp = false
        this.collidedRight = false
        this.collidedLeft = false
        this.collidedY = false
        this.collidedX = false
        this.collidedSpecialObjects = []

        // counters
        this.dashCounter = 0
        this.deadCounter = 0

        this.collidedDownCounter = 0
        this.collidedUpCounter = 0
        this.collidedLeftCounter = 0
        this.collidedRightCounter = 0

        this.wallclimbCounter = 0
        this.collisionCounter = 0
        this.notGroundedCounter = 0
        this.WallJumpLeftCounter = 0
        this.WallJumpRightCounter = 0

        // ------Variables for sprite
        this.isMovingRight = true
        this.playerImage = new Sprite("player/pixilartSprite.png", this.width, this.height, 70, 65)
        this.standRight = new Sprite("player/standingRight.png", this.width, this.height, 70, 65)
        this.standLeft = new Sprite("player/StandingLeft.png", this.width, this.height, 70, 65)
        this.runRight = new Sprite("player/pixilartSprite.png", this.width, this.height, 70, 65)
        this.runLeft = new Sprite("player/pixilartSpriteLeft.png", this.width, this.height, 70, 65)
        this.jumpRight = new Sprite("player/jumpRight.png", this.width, this.height, 70, 65)
        this.jumpUp = new Sprite("player/jumpUp.png", this.width, this.height, 70, 65)
        this.airTimeUp = new Sprite("player/airTimeUp.png", this.width, this.height, 70, 65)
        this.jumpUpLeft = new Sprite("player/jumpUpLeft.png", this.width, this.height, 70, 65)
        this.airTimeLeft = new Sprite("player/airTimeLeft.png", this.width, this.height, 70, 65)

        this.dashJumpUpRight = new Sprite(
            "player/dashJumpUpRight.png",
            this.width,
            this.height,
            70,
            70
        )
        this.dashJumpUpLeft = new Sprite(
            "player/dashJumpUpLeft.png",
            this.width,
            this.height,
            70,
            70
        )
        this.airTimeDashLeft = new Sprite(
            "player/airTimeDashLeft.png",
            this.width,
            this.height,
            70,
            70
        )
        this.airTimeDashRight = new Sprite(
            "player/airTimeDashRight.png",
            this.width,
            this.height,
            70,
            70
        )

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

        /**@type {Sprite} */
        this.currentSprite = this.sprites.stand.right

        this.previousSprite = this.sprites.stand.right

        this.currentSpriteFrames = this.sprites.stand.frames
        this.currentFrameBuffer = this.sprites.stand.buffer
    }

    action() {
        this.updateFrames()
        this.changeVelocities()

        // apply velocities
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // increase counters
        this.collidedDownCounter += 1
        this.collidedUpCounter += 1
        this.collidedLeftCounter += 1
        this.collidedRightCounter += 1
        this.WallJumpLeftCounter += 1
        this.WallJumpRightCounter += 1
        if (!this.isGrounded) {
            this.notGroundedCounter += 1
        }

        if (this.position.y > 512) {
            this.velocity.x = 0
            this.velocity.y = 0
            this.die()
        }

        this.checkDeath()
    }

    draw(ctx) {
        if (this.isDead) return
        ctx.beginPath()

        if (!this.currentSprite.loaded) return

        ctx.filter = this.isDashing ? "blur(0.6px)" : "none"

        this.currentSprite.draw(ctx, this.currentFrame, 0, this.position)

        ctx.globalAlpha = 0

        ctx.filter = "blur(4px)"

        if (this.isDashing) {
            for (let i = 0; i < this.pastDashPositions.length; i++) {
                ctx.globalAlpha += 0.035
                this.currentSprite.draw(ctx, this.currentFrame, 0, this.pastDashPositions[i])
            }
        }

        ctx.filter = "none"

        ctx.globalAlpha = 1

        // this.updateFrames()

        // console.log("velocity x: " + this.velocity.x)
        // console.log("velocity y: " + this.velocity.y)
        // console.log(this.currentSprite.img)
        // // console.log("grounded: " + this.isGrounded)
        // console.log("falling: " + this.falling)
        // console.log("Dash: " + this.isDashing)
        // console.log("Movingplatform: " + this.standingOnMovingPlatform)

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
        //Acceleration stops after not pressing keys, it should continue and gradually stop
        // dashing diagonaly has is like dashing up and dashing right
        // when jumping on jump-pad and holding space you jump twice as high
        // when moving to the right or left and meanwhile dashing the player holds the dash speed (15) even after the dash

        const maxSpeedX = 6

        // gravity
        this.velocity.y += this.level.gravity
        this.gravity += this.level.gravity

        // entschleunigung wenn man weder nach rechts noch nach links drückt und nicht dasht
        if (
            !keysPressed.get("ArrowRight") &&
            !keysPressed.get("ArrowLeft") &&
            !this.standingOnMovingPlatform &&
            !this.isDashing
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
            this.velocity.x = this.platformVelocityX
            if (this.isMovingRight) this.currentSprite = this.sprites.stand.right
            else this.currentSprite = this.sprites.stand.left
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
                this.velocity.x += maxSpeedX / 4
                this.isMovingRight = true
            }
        }
        // sprite animation for moving right on the ground when pressing the right key
        if (keysPressed.get("ArrowRight") && this.isGrounded && this.falling === false) {
            this.currentSprite = this.sprites.run.right
            this.currentSpriteFrames = this.sprites.run.frames
            this.currentFrameBuffer = this.sprites.run.buffer
        }
        // Left Movement
        if (keysPressed.get("ArrowLeft")) {
            if (this.velocity.x > -maxSpeedX) {
                this.velocity.x -= maxSpeedX / 4
                this.isMovingRight = false
            }
        }
        // sprite animation for moving left on the ground when pressing the left key
        if (keysPressed.get("ArrowLeft") && this.isGrounded && this.falling === false) {
            this.currentSprite = this.sprites.run.left
            this.currentSpriteFrames = this.sprites.run.frames
            this.currentFrameBuffer = this.sprites.run.buffer
        }

        // jump
        if (keysPressed.get(" ") && this.isGrounded === true) {
            this.velocity.y -= 10
            this.isJumping = true
            this.jummping = true
            this.letGoOfSpace = false
            this.currentFrame = 0
        }

        if (!keysPressed.get(" ")) {
            this.letGoOfSpace = true
        }

        // walljump
        if (
            (this.collidedLeftCounter <= 5 || this.collidedRightCounter <= 5) &&
            keysPressed.get(" ") &&
            this.letGoOfSpace
        ) {
            if (this.collidedLeftCounter <= 5 && this.WallJumpLeftCounter > 50) {
                this.velocity.y = -7.5
                this.velocity.x = 7.5
                this.WallJumpLeft = true
                this.WallJumpLeftCounter = 0
                this.WallJumpRightCounter = 50
            }
            if (this.collidedRightCounter <= 5 && this.WallJumpRightCounter > 50) {
                this.velocity.y = -7.5
                this.velocity.x = -7.5
                this.WallJumpRight = true
                this.WallJumpRightCounter = 0
                this.WallJumpLeftCounter = 50
            }
        }

        // Check if the player is falling
        if (this.isGrounded === false && this.velocity.y > 0 && !this.standingOnMovingPlatform)
            this.falling = true
        else this.falling = false

        // jummping Animation
        if (this.velocity.y <= 0 && !this.isGrounded) {
            if (this.isMovingRight) {
                if (this.isDashing) {
                    this.currentSprite = this.sprites.jump.dashRight
                } else {
                    this.currentSprite = this.sprites.jump.right
                }
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

        // enables variable jump, makes it so you fall down quicker if you let go of spacebar mid jump
        if (!keysPressed.get(" ") && this.velocity.y < -this.gravity && this.isJumping === true) {
            this.velocity.y = -this.gravity
        }

        // Dash if shift is pressed and you can dash and at least one direction is pressed or you are already dashing
        if (
            (keysPressed.get("Shift") &&
                this.canDash &&
                (keysPressed.get("ArrowRight") ||
                    keysPressed.get("ArrowLeft") ||
                    keysPressed.get("ArrowDown") ||
                    keysPressed.get("ArrowUp"))) ||
            this.isDashing
        ) {
            if (!this.isDashing) {
                this.pressedRight = keysPressed.get("ArrowRight")
                this.pressedLeft = keysPressed.get("ArrowLeft")
                this.pressedDown = keysPressed.get("ArrowDown")
                this.pressedUp = keysPressed.get("ArrowUp")
                this.velocity.x = 0
                this.velocity.y = this.level.gravity
                this.gravity = 0
                this.isDashing = true
                this.canDash = false
                this.pastDashPositions = []
            }

            //increase counter
            this.dashCounter++

            // save positions
            if (this.dashCounter > 4 && this.dashCounter % 2) {
                this.pastDashPositions.push(structuredClone(this.position))
            }

            // acceleration
            if (this.dashCounter < 5) {
                if (this.pressedRight) {
                    this.game.camera.shake(-2, 0)
                    this.velocity.x += 0.1
                    this.velocity.y -= this.level.gravity
                }
                if (this.pressedLeft) {
                    this.game.camera.shake(2, 0)
                    this.velocity.x -= 0.1
                    this.velocity.y -= this.level.gravity
                }
                if (this.pressedDown) {
                    this.game.camera.shake(0, 2)
                    this.velocity.y = 0.1 * this.dashCounter
                }
                if (this.pressedUp) {
                    this.game.camera.shake(0, -2)
                    this.velocity.y = -0.1 * this.dashCounter
                }
            }

            // top Speed
            if (this.dashCounter >= 5 && this.dashCounter <= 10) {
                if (this.pressedRight) {
                    this.velocity.x = 14
                    this.velocity.y -= this.level.gravity
                }
                if (this.pressedLeft) {
                    this.velocity.x = -14
                    this.velocity.y -= this.level.gravity
                }
                if (this.pressedDown) {
                    this.velocity.y = 7
                }
                if (this.pressedUp) {
                    this.velocity.y = -7
                }
            }

            // decceleration
            if (this.dashCounter > 10) {
                if (this.pressedRight) {
                    this.velocity.x -= 1.34
                }
                if (this.pressedLeft) {
                    this.velocity.x += 1.34
                }
            }

            // stop dash after N frames and reset Dash State
            if (this.dashCounter > 16) {
                this.isDashing = false
                this.dashDecelCounter = 0
                this.dashCounter = 0
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

        this.platformVelocityX = 0
        this.platformVelocityY = 0

        this.isGrounded = false
        this.standingOnMovingPlatform = false
        this.collidingWithPlatform = false

        this.collidedDown = false
        this.collidedUp = false
        this.collidedRight = false
        this.collidedLeft = false
        this.collidedY = false
        this.collidedX = false
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
        this.collidedY = false
    }

    /** @returns if player is in an element */
    isColliding(element1, element2) {
        const belowTop =
            element1.position.y > element2.position.y - element1.height + element2.collisionOffset.y
        const aboveBottom =
            element1.position.y < element2.position.y + element2.height - element2.collisionOffset.y
        const rightOrLeft =
            element2.position.x - element1.width + element2.collisionOffset.x < element1.position.x
        const leftOrRight =
            element1.position.x < element2.position.x + element2.width - element2.collisionOffset.x

        return belowTop && aboveBottom && rightOrLeft && leftOrRight && element1 !== element2
    }

    checkDeath() {
        if (!this.isDead) return
        ++this.deadCounter

        if (this.deadCounter === 70) {
            this.position = structuredClone(this.respawnPoint)
            this.game.camera.load()
            this.isDead = false
            this.deadCounter = 0
        }
    }

    die() {
        this.isDead = true

        const colors = ["#693a00", "#546d8e", "#ffffff", "#333a42"]
        this.game.particles = new Particles(this.position.x, this.position.y, colors)
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
