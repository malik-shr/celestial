import Element from "./element"
import { keysPressed } from "../listener/store"

export default class Player extends Element {
    velocity
    gravity

    direction
    isJumping
    level
    cameraBox

    width = 32
    height = 32

    constructor(x, y, level) {
        super(x, y)

        this.velocity = {
            x: 0,
            y: 0,
        }
        this.isJumping = false
        this.level = level
        this.gravity = 0

        this.cameraBox = {
            position: {
                x: 0,
                y: 0,
            },

            width: 600,
            height: 160,
        }
    }

    // Override
    checkCollision(element) {
        for (const elementItem of this.level.elementList) {
            // checks if player is in an object and depending on its previous position (current position - current velocities) it stops the player at the right position

            // touching upper bound: this.position.y > elementItem.position.y-this.sizeY*32
            // touching lower bound: this.position.y < elementItem.position.y + elementItem.sizeY*32
            // touching left: elementItem.position.x-this.sizeX*32 < this.position.x
            // touching right: this.position.x < elementItem.position.x+elementItem.sizeX*32

            // damit in dieser funktion geänderte werte nicht auf folgende if anfragen einfluss haben    
            const previousVelocityX = Math.round(this.velocity.x / 10)
            const previousVelocityY = Math.round(this.velocity.y / 10) + Math.round(this.gravity / 10)            

            if (elementItem.constructor.name !== "Player" &&
                this.position.y > elementItem.position.y - this.sizeY * 32 &&
                this.position.y < elementItem.position.y + elementItem.sizeY * 32 &&
                elementItem.position.x - this.sizeX * 32 < this.position.x &&
                this.position.x < elementItem.position.x + elementItem.sizeX * 32) 
            {
                if (this.position.x - previousVelocityX <= elementItem.position.x - this.sizeX * 32) 
                {
                    this.position.x = elementItem.position.x - this.sizeX * 32
                    this.velocity.x = 0
                }
                if (this.position.x - previousVelocityX >= elementItem.position.x + elementItem.sizeX * 32) 
                {
                    this.position.x = elementItem.position.x + elementItem.sizeX * 32
                    this.velocity.x = 0
                }
                if (this.position.y - previousVelocityY <= elementItem.position.y - this.sizeY * 32) 
                {
                    this.position.y = elementItem.position.y - this.sizeY * 32
                    this.velocity.y = 0
                    this.gravity = 0
                    this.isJumping = false
                }
                if (this.position.y - previousVelocityY >= elementItem.position.y + elementItem.sizeY * 32) 
                {
                    this.position.y = elementItem.position.y + elementItem.sizeY * 32
                    this.velocity.y = 0
                    this.gravity = 0
                }
            }
        }
    }

    // Override
    action() {

        this.gravity += this.level.gravity

        // entschleunigung wenn man die jeweilige taste nicht drückt oder man die richtung von links nach rechts oder von rechts nach links wechselt
        // check with velocities not direction
        if (
            (!keysPressed.get("ArrowRight") &&
                !keysPressed.get("ArrowLeft")) ||
            (keysPressed.get("ArrowRight") && this.velocity.x < 0) ||
            (keysPressed.get("ArrowLeft") && this.velocity.x > 0)
        ) {
            this.velocity.x = 0
        }

        // beschleunigung wenn man die jeweilige taste drückt
        if (keysPressed.get("ArrowRight")) {
            if (this.velocity.x < 120) {
                this.velocity.x += 8
            }

            // doesnt work because doesnt pan right when player velocitity changed by non key press
        }

        if (keysPressed.get("ArrowLeft")) {
            if (this.velocity.x > -120) {
                this.velocity.x -= 8
            }

        }

        // second part means you can only jump if grounded
        if (keysPressed.get(" ") && this.isJumping === false) {
            this.velocity.y = -150
            this.isJumping = true
        }

        if (
            !keysPressed.get(" ") &&
            this.velocity.y < -this.gravity - 64 &&
            this.isJumping === true
        ) {
            this.velocity.y = -this.gravity - 64
        }

        // rounding for more fine grained velocity
        this.position.x += Math.round(this.velocity.x / 10)
        this.position.y +=
            Math.round(this.velocity.y / 10) + Math.round(this.gravity / 10)

        this.cameraBox.position.x =
            this.position.x + this.width / 2 - this.cameraBox.width / 2
        this.cameraBox.position.y =
            this.position.y + this.height / 2 - this.cameraBox.height / 2
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
        ctx.rect(
            this.position.x,
            this.position.y,
            this.sizeX * 32,
            this.sizeY * 32
        )
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }
}
