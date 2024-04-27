import { keysPressed } from "../store"
import Element from "./element"
import SolidBlock from "./solidBlock"

export default class Player extends Element {
    velocityX
    velocityY

    direction
    isJumping
    level

    constructor(x, y, level) {
        super(x, y)

        this.velocityX = 0
        this.velocityY = 0
        this.isJumping = false
        this.level = level
    }

    changeVelocities() {
        // gravity accumulates every tick
        this.level.gravity += 7

        // entschleunigung wenn man die jeweilige taste nicht drückt oder man die richtung von links nach rechts oder von rechts nach links wechselt
        if(!keysPressed.get("ArrowRight") && !keysPressed.get("ArrowLeft") || 
        keysPressed.get("ArrowRight") && this.direction === "left" ||
        keysPressed.get("ArrowLeft") && this.direction === "right") {
            this.velocityX = 0
        }

        // beschleunigung wenn man die jeweilige taste drückt
        if(keysPressed.get("ArrowRight") && this.velocityX < 120) {
            this.velocityX += 8
            this.direction = "right"
        }

        if(keysPressed.get("ArrowLeft")  && this.velocityX > -120) {
            this.velocityX -= 8
            this.direction = "left"
        }

        // second part means you can only jump if grounded
        if(keysPressed.get(" ") && this.y === this.level.groundPosition) {
            this.velocityY = -150
            this.isJumping = true
        }

        if(!keysPressed.get(" ") && this.velocityY < -this.level.gravity-64 && this.isJumping === true) {
            this.velocityY = -this.level.gravity-64
            this.isJumping = false
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
    checkCollision(element) {
        // makes sure player doesnt go below ground and resets velocities in y direction
        if (this.y >= this.level.groundPosition) {
            this.y = this.level.groundPosition
            this.velocityY = 0
            this.level.gravity = 0
            this.isJumping = false
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
        ctx.rect(this.x, this.y, this.sizeX * 32, this.sizeY * 32)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }
}
