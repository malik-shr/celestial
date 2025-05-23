import Element from "./element"
import { keysPressed } from "../listener/store"
import Sprite from "./sprite"
import Particles from "./particle"

export default class Player extends Element {
    constructor(x, y, game) {
        super(x, y, 32, 38)

        this.game = game
        this.level = game.level

        this.godmode = false

        this.previous = null

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
        this.tempVelocity = 0

        // status flags
        this.isJumping = false
        this.isWallClimbing = false
        this.isDashing = false
        this.isDead = false
        this.canDash = true
        this.dancing = true

        // collision flags
        this.isGrounded = false
        this.standingOnMovingPlatform = false
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

        this.collidedDownCounter = 5
        this.collidedUpCounter = 5
        this.collidedLeftCounter = 5
        this.collidedRightCounter = 5
        this.dancingCounter = 0

        this.collidingWithPlatformCounter = 0

        this.wallclimbCounter = 0
        this.collisionCounter = 0
        this.notGroundedCounter = 0
        this.WallJumpLeftCounter = 6
        this.WallJumpRightCounter = 6

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

        this.wallHangLeft = new Sprite("player/wallHangL.png", this.width, this.height, 70, 65)
        this.wallHangRight = new Sprite("player/wallHangR.png", this.width, this.height, 70, 65)

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
                left: this.jumpUpLeft,
                frames: (this.frameRate = 8),
                buffer: (this.frameBuffer = 2),
            },
            fall: {
                right: this.airTimeUp,
                left: this.airTimeLeft,
                frames: (this.frameRate = 8),
                buffer: (this.frameBuffer = 5),
            },
            hang: {
                right: this.wallHangRight,
                left: this.wallHangLeft,
            },
        }

        /**@type {Sprite} */
        this.currentSprite = this.sprites.stand.right

        this.previousSprite = this.sprites.stand.right

        this.currentSpriteFrames = this.sprites.stand.frames
        this.currentFrameBuffer = this.sprites.stand.buffer

        this.deaths = 0
    }

    action() {
        if (keysPressed.get("s") && this.level.name === "GODMODE") {
            this.godmode = !this.godmode
        }
        if (!this.godmode || this.level.name !== "GODMODE") {
            this.checkDeath()

            if (!this.isDead) {
                this.updateFrames()
                this.changeVelocities()
            }

            if (this.position.y > 308 && !this.isDead) {
                this.die()
            }
        } else {
            this.changeVelocitiesGodmode()
        }

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
        this.collidingWithPlatformCounter += 1
        if (!this.isGrounded) {
            this.notGroundedCounter += 1
        }
    }

    draw(ctx) {
        if (this.isDead) return
        ctx.beginPath()

        if (!this.currentSprite.loaded) return

        const filter = !this.canDash
            ? "sepia(1) saturate(4) brightness(95%) contrast(1.1) blur(0.6px)"
            : "none"

        ctx.filter = filter

        this.currentSprite.draw(ctx, this.currentFrame, 0, this.position)

        if (this.isDashing) {
            ctx.globalAlpha = 0
            ctx.filter = "contrast(0.1) sepia(1) saturate(4) brightness(95%) blur(4px)"
            for (let i = 0; i < this.pastDashPositions.length; i++) {
                ctx.globalAlpha += 0.07
                this.currentSprite.draw(ctx, this.currentFrame, 0, this.pastDashPositions[i])
            }
        }

        ctx.filter = "none"
        ctx.globalAlpha = 1

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
        // Acceleration stops after not pressing keys, it should continue and gradually stop
        // dashing diagonaly has is like dashing up and dashing right
        // when jumping on jump-pad and holding space you jump twice as high
        // when moving to the right or left and meanwhile dashing the player holds the dash speed (15) even after the dash

        const maxSpeedX = 5
        const terminalVelocity = 15

        // gravity (with terminal velocity) and wallslide
        if (
            (this.velocity.y < terminalVelocity &&
                !(this.collidedLeftCounter <= 1 || this.collidedRightCounter <= 1)) ||
            this.velocity.y < 0
        ) {
            this.velocity.y += this.level.gravity
            this.gravity += this.level.gravity
        } else if (
            this.velocity.y < terminalVelocity / 4 &&
            (this.collidedLeftCounter <= 1 || this.collidedRightCounter <= 1)
        ) {
            this.velocity.y += this.level.gravity / 2
            this.gravity += this.level.gravity / 2
        } else if (
            this.velocity.y > terminalVelocity / 4 &&
            (this.collidedLeftCounter <= 1 || this.collidedRightCounter <= 1)
        ) {
            this.velocity.y = terminalVelocity / 4
            this.gravity = terminalVelocity / 4
        }

        // entschleunigung wenn man weder nach rechts noch nach links drückt und nicht dasht und nicht auf einer moving plattform steht und nicht walljumped
        if (
            !keysPressed.get("ArrowRight") &&
            !keysPressed.get("ArrowLeft") &&
            this.collidingWithPlatformCounter > 1 &&
            !this.isDashing &&
            this.WallJumpLeftCounter > 5 &&
            this.WallJumpRightCounter > 5
        ) {
            this.velocity.x = 0
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

        // Right Movement
        if (keysPressed.get("ArrowRight")) {
            if (
                this.velocity.x < maxSpeedX + this.platformVelocityX &&
                this.WallJumpRightCounter > 5
            ) {
                this.velocity.x += maxSpeedX / 4
                this.isMovingRight = true
            }
        }

        // Left Movement
        if (keysPressed.get("ArrowLeft")) {
            if (
                this.velocity.x > -maxSpeedX + this.platformVelocityX &&
                this.WallJumpLeftCounter > 5
            ) {
                this.velocity.x -= maxSpeedX / 4
                this.isMovingRight = false
            }
        }

        // Jump
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

        // Walljump
        if (
            (this.collidedLeftCounter <= 5 || this.collidedRightCounter <= 5) &&
            keysPressed.get(" ") &&
            this.letGoOfSpace
        ) {
            if (this.collidedLeftCounter <= 5 && this.WallJumpLeftCounter > 30) {
                this.velocity.y = -10.5
                this.velocity.x = 5
                this.WallJumpLeft = true
                this.WallJumpLeftCounter = 0
                this.WallJumpRightCounter = 30
                this.isDashing = false
                this.dashCounter = 0
                this.isMovingRight = true
            }
            if (this.collidedRightCounter <= 5 && this.WallJumpRightCounter > 30) {
                this.velocity.y = -10.5
                this.velocity.x = -5
                this.WallJumpRight = true
                this.WallJumpRightCounter = 0
                this.WallJumpLeftCounter = 30
                this.isDashing = false
                this.dashCounter = 0
                this.isMovingRight = false
            }
        }

        if (
            !keysPressed.get(" ") &&
            this.velocity.y < -this.gravity &&
            this.isJumping === true &&
            !this.isDashing
        ) {
            // enables variable jump, makes it so you fall down quicker if you let go of spacebar mid jump
            this.velocity.y = -this.gravity
        }

        // Dash if shift is pressed and you can dash and at least one direction is pressed or you are already dashing
        this.dash()

        // Check if the player is falling
        if (
            this.isGrounded === false &&
            this.velocity.y > 0 &&
            !this.standingOnMovingPlatform &&
            this.collidedLeftCounter > 5 &&
            this.collidedRightCounter > 5
        )
            this.falling = true
        else this.falling = false

        // check if player is on the ground
        if (this.isGrounded) this.jummping = false

        // animations

        // Sprite animation for standing still
        if (this.velocity.x === 0 && this.isGrounded) {
            if (this.isMovingRight) {
                this.currentSprite = this.sprites.stand.right
            } else {
                this.currentSprite = this.sprites.stand.left
            }
        }

        // sprite animation for moving left on the ground when pressing the left key
        if (
            keysPressed.get("ArrowLeft") &&
            this.isGrounded &&
            this.falling === false &&
            this.WallJumpLeftCounter > 5
        ) {
            this.currentSprite = this.sprites.run.left
            this.currentSpriteFrames = this.sprites.run.frames
            this.currentFrameBuffer = this.sprites.run.buffer
        }

        // sprite animation for moving right on the ground when pressing the right key
        if (
            keysPressed.get("ArrowRight") &&
            this.isGrounded &&
            this.falling === false &&
            this.WallJumpRightCounter > 5
        ) {
            this.currentSprite = this.sprites.run.right
            this.currentSpriteFrames = this.sprites.run.frames
            this.currentFrameBuffer = this.sprites.run.buffer
        }

        if (this.isGrounded && this.dashCounter > 40) {
            this.isDashing = false
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

        //falling animation
        if (this.falling) {
            if (this.isMovingRight) {
                this.currentSprite = this.sprites.fall.right
            } else {
                this.currentSprite = this.sprites.fall.left
            }

            this.currentFrameBuffer = this.sprites.fall.buffer
            this.jummping = false
        }

        // jummping Animation
        if (this.velocity.y <= 0 && !this.isGrounded) {
            if (this.isMovingRight) {
                this.currentSprite = this.sprites.jump.right
            } else {
                this.currentSprite = this.sprites.jump.left
            }

            this.currentSpriteFrames = this.sprites.jump.frames
            this.currentFrameBuffer = this.sprites.jump.buffer
            this.jummping = true
        }

        // wallHang animation
        if ((this.collidedLeftCounter <= 0 && !this.isGrounded) || this.WallJumpRightCounter <= 5) {
            this.currentSprite = this.sprites.hang.left
        }

        if ((this.collidedRightCounter <= 0 && !this.isGrounded) || this.WallJumpLeftCounter <= 5) {
            this.currentSprite = this.sprites.hang.right
        }

        if (!keysPressed.get("Shift")) {
            this.letGoOfShift = true
        }

        //dance
        if (keysPressed.get("d")) {
            this.dancing = true

            this.dancingCounter += 1

            if (this.dancing) {
                if (Math.floor(this.dancingCounter / 25) % 2 === 0) {
                    this.currentSprite = this.sprites.jump.right
                } else {
                    this.currentSprite = this.sprites.jump.left
                }
            }

            if (this.dancingCounter >= 95) {
                this.dancingCounter = 0
            }
        }
    }

    dash() {
        const maxSpeedX = 5

        if (
            (keysPressed.get("Shift") &&
                this.canDash &&
                (keysPressed.get("ArrowRight") ||
                    keysPressed.get("ArrowLeft") ||
                    keysPressed.get("ArrowDown") ||
                    keysPressed.get("ArrowUp")) &&
                this.letGoOfShift) ||
            this.isDashing
        ) {
            if (!this.isDashing) {
                this.pressedRight = keysPressed.get("ArrowRight")
                this.pressedLeft = keysPressed.get("ArrowLeft")
                this.pressedDown = keysPressed.get("ArrowDown")
                this.pressedUp = keysPressed.get("ArrowUp")
                this.wasGrounded = this.isGrounded
                this.isDashing = true
                this.canDash = false
                this.isJumping = false
                this.letGoOfShift = false
                this.pastDashPositions = []
            }

            if (this.dashCounter === 0) {
                this.currentFrame = 0
            }

            if (this.dashCounter === 3) {
                this.game.music.playSound(this.game.music.dashSound)
            }

            if (this.dashCounter < 8) {
                if (this.wasGrounded) {
                    this.collidedDownCounter = 0
                }
            }

            // acceleration
            if (this.dashCounter < 5) {
                this.pressedRight = this.pressedRight || keysPressed.get("ArrowRight")
                this.pressedLeft = this.pressedLeft || keysPressed.get("ArrowLeft")
                this.pressedDown = this.pressedDown || keysPressed.get("ArrowDown")
                this.pressedUp = this.pressedUp || keysPressed.get("ArrowUp")

                this.velocity.x = 0
                this.velocity.y = 0
                this.gravity = 0
            }

            if (this.dashCounter > 4 && this.dashCounter <= 6) {
                // right
                if (
                    this.pressedRight &&
                    !this.pressedLeft &&
                    !this.pressedDown &&
                    !this.pressedUp
                ) {
                    this.game.camera.shake(-2, 0)
                }
                // left
                if (
                    !this.pressedRight &&
                    this.pressedLeft &&
                    !this.pressedDown &&
                    !this.pressedUp
                ) {
                    this.game.camera.shake(2, 0)
                }
                // down
                if (
                    !this.pressedRight &&
                    !this.pressedLeft &&
                    this.pressedDown &&
                    !this.pressedUp
                ) {
                    this.game.camera.shake(0, 2)
                }
                // up
                if (
                    !this.pressedRight &&
                    !this.pressedLeft &&
                    !this.pressedDown &&
                    this.pressedUp
                ) {
                    this.game.camera.shake(0, -2)
                }
                // up and right
                if (this.pressedRight && !this.pressedLeft && !this.pressedDown && this.pressedUp) {
                    this.game.camera.shake(-1, 1)
                }
                // up and left
                if (!this.pressedRight && this.pressedLeft && !this.pressedDown && this.pressedUp) {
                    this.game.camera.shake(1, 1)
                }
                // down and right
                if (this.pressedRight && !this.pressedLeft && this.pressedDown && !this.pressedUp) {
                    this.game.camera.shake(-1, -1)
                }
                // down and left
                if (!this.pressedRight && this.pressedLeft && this.pressedDown && !this.pressedUp) {
                    this.game.camera.shake(1, 1)
                }
            }

            // top Speed
            if (this.dashCounter >= 5 && this.dashCounter < 10) {
                // right
                if (
                    this.pressedRight &&
                    !this.pressedLeft &&
                    !this.pressedDown &&
                    !this.pressedUp
                ) {
                    this.velocity.x = 14
                    this.velocity.y -= this.level.gravity
                    this.gravity -= this.level.gravity
                }
                // left
                if (
                    !this.pressedRight &&
                    this.pressedLeft &&
                    !this.pressedDown &&
                    !this.pressedUp
                ) {
                    this.velocity.x = -14
                    this.velocity.y -= this.level.gravity
                    this.gravity -= this.level.gravity
                }
                // down
                if (
                    !this.pressedRight &&
                    !this.pressedLeft &&
                    this.pressedDown &&
                    !this.pressedUp
                ) {
                    this.velocity.x = 0
                    this.velocity.y = 10
                    this.gravity = 10
                }
                // up
                if (
                    !this.pressedRight &&
                    !this.pressedLeft &&
                    !this.pressedDown &&
                    this.pressedUp
                ) {
                    this.velocity.x = 0
                    this.velocity.y = -10
                    this.gravity = -10
                }
                // up and right
                if (this.pressedRight && !this.pressedLeft && !this.pressedDown && this.pressedUp) {
                    this.velocity.x = 14
                    this.velocity.y = -7
                    this.gravity = -7
                }
                // up and left
                if (!this.pressedRight && this.pressedLeft && !this.pressedDown && this.pressedUp) {
                    this.velocity.x = -14
                    this.velocity.y = -7
                    this.gravity = -7
                }
                // down and right
                if (this.pressedRight && !this.pressedLeft && this.pressedDown && !this.pressedUp) {
                    this.velocity.x = 14
                    this.velocity.y = 7
                    this.gravity = 7
                }
                // down and left
                if (!this.pressedRight && this.pressedLeft && this.pressedDown && !this.pressedUp) {
                    this.velocity.x = -14
                    this.velocity.y = 7
                    this.gravity = 7
                }
            }

            // save positions
            if (this.dashCounter >= 5 && this.dashCounter % 2) {
                this.pastDashPositions.push(structuredClone(this.position))
            }

            // decceleration (if necessary)
            if (this.dashCounter >= 10 && this.dashCounter <= 16) {
                if (this.dashCounter === 10) {
                    this.tempVelocity = this.velocity.x
                }
                if (this.velocity.x > maxSpeedX) {
                    this.velocity.x -= (this.tempVelocity - maxSpeedX) / 5
                }
                if (this.velocity.x < -maxSpeedX) {
                    this.velocity.x -= (this.tempVelocity + maxSpeedX) / 5
                }
            }

            //increase counter
            this.dashCounter++

            // stop dash after N frames and reset Dash State
            if (this.dashCounter > 16) {
                this.isDashing = false
                this.dashCounter = 0
                this.gravity = 0
            }
        }
    }

    changeVelocitiesGodmode() {
        if (keysPressed.get("ArrowRight")) {
            this.velocity.x = 5
        }
        if (keysPressed.get("ArrowLeft")) {
            this.velocity.x = -5
        }
        if (keysPressed.get("ArrowUp")) {
            this.velocity.y = -5
        }
        if (keysPressed.get("ArrowDown")) {
            this.velocity.y = 5
        }
        if (!keysPressed.get("ArrowRight") && !keysPressed.get("ArrowLeft")) {
            this.velocity.x = 0
        }
        if (!keysPressed.get("ArrowUp") && !keysPressed.get("ArrowDown")) {
            this.velocity.y = 0
        }
    }

    // Override
    checkCollision() {
        if (this.godmode === false) {
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
        this.respawnPoint.x = this.previous.respawnPoint.x
        this.respawnPoint.y = this.previous.respawnPoint.y
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

        this.velocity.x = 0
        this.velocity.y = 0

        if (this.deadCounter === 30) {
            this.position = structuredClone(this.respawnPoint)
            this.game.camera.load()
            this.isDead = false
            this.deadCounter = 0

            this.resetValues()
        }
    }

    die() {
        ++this.deaths
        this.isDead = true

        const colors = ["#693a00", "#546d8e", "#ffffff", "#333a42"]
        this.level.elementList.add(new Particles(this.position.x, this.position.y, colors, 2))

        this.game.music.playSound(this.game.music.deadSound)
    }

    resetValues() {
        // additional velocities
        this.gravity = 0
        this.platformVelocity = 0
        this.platformVelocityX = 0
        this.platformVelocityY = 0

        // status flags
        this.isJumping = false
        this.isWallClimbing = false
        this.isDashing = false
        this.canDash = true

        // collision flags
        this.isGrounded = false
        this.standingOnMovingPlatform = false
        this.collidedDown = false
        this.collidedUp = false
        this.collidedRight = false
        this.collidedLeft = false
        this.collidedY = false
        this.collidedX = false
        this.collidedSpecialObjects = []

        // counters
        this.dashCounter = 0

        this.collidedDownCounter = 5
        this.collidedUpCounter = 5
        this.collidedLeftCounter = 5
        this.collidedRightCounter = 5

        this.collidingWithPlatformCounter = 0

        this.wallclimbCounter = 0
        this.collisionCounter = 0
        this.notGroundedCounter = 0
        this.WallJumpLeftCounter = 0
        this.WallJumpRightCounter = 0

        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 4

        this.game.level.elementList.resetMovingPlattforms()
    }

    /** @returns players state at the time of function call */
    clone() {
        return {
            position: structuredClone(this.position),
            velocity: structuredClone(this.velocity),
            respawnPoint: structuredClone(this.respawnPoint),
            gravity: this.gravity,

            isJumping: this.isJumping,
            isGrounded: this.isGrounded,
            canDash: this.canDash,
            wallclimbCounter: this.wallclimbCounter,
        }
    }
}
