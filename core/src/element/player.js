import { keysPressed } from "../store"
import Element from "./element"

export default class Player extends Element {
    x
    y

    velocityX
    velocityY

    direction
    isJumping
    level

    constructor(x, y, level) {
        super()

        this.x = x
        this.y = y
        this.velocityX = 0
        this.velocityY = 0
        this.isJumping = false
        this.level = level
    }

    changeVelocities() {
        // gravity accumulates every tick
        this.level.gravity += 2

        // beschleunigung wenn man die jeweilige taste drückt
        if (keysPressed.get("ArrowRight") && this.velocityX < 50) {
            this.velocityX += 1.5
        }

        if (keysPressed.get("ArrowLeft") && this.velocityX > -50) {
            this.velocityX -= 1.5
        }

        // entschleunigung wenn man die jeweilige taste nicht drückt
        if (!keysPressed.get("ArrowRight") && this.velocityX > 1.5) {
            this.velocityX -= 1.5
        }

        if (!keysPressed.get("ArrowLeft") && this.velocityX < -1.5) {
            this.velocityX += 1.5
        }

        // second part means you can only jump if grounded
        if (keysPressed.get(" ") && this.y === this.level.groundPosition) {
            this.velocityY -= 75
        }

        if (
            keysPressed.get("ArrowUp") &&
            this.y === this.level.groundPosition
        ) {
            this.velocityY -= 75
        }
    }

    applyVelocities() {
        // rounding for more fine grained velocity
        this.x += Math.round(this.velocityX / 10)
        this.y +=
            Math.round(this.velocityY / 10) +
            Math.round(this.level.gravity / 10)
    }

    // Override
    checkCollision() {
        // makes sure player doesnt go below ground and resets velocities in y direction
        if (this.y >= this.level.groundPosition) {
            this.y = this.level.groundPosition
            this.velocityY = 0
            this.level.gravity = 0
        }
    }

    // Override
    action() {
        this.changeVelocities()
        this.applyVelocities()
    }

    // Override
    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, 50, 50)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }
}
