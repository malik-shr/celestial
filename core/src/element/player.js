import Element from "./element"
import { keysPressed } from "../listener/store"
import SolidBlock from "./solidBlock"

export default class Player extends Element {
    velocity
    gravity

    direction
    isJumping
    level
    camera
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
        this.canMove = 10
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

    changeVelocities() {
        // entschleunigung wenn man die jeweilige taste nicht drückt oder man die richtung von links nach rechts oder von rechts nach links wechselt
        // check with velocities not direction
        if (
            (!keysPressed.get("ArrowRight") && !keysPressed.get("ArrowLeft")) ||
            (keysPressed.get("ArrowRight") && this.velocity.x < 0) ||
            (keysPressed.get("ArrowLeft") && this.velocity.x > 0)
        ) {
            this.velocity.x = 0
        }

        // beschleunigung wenn man die jeweilige taste drückt
        if (keysPressed.get("ArrowRight")) {
            if (this.velocity.x < 12) {
                this.velocity.x += 1
            }
        }

        if (keysPressed.get("ArrowLeft")) {
            if (this.velocity.x > -12) {
                this.velocity.x -= 1
            }
        }

        // second part means you can only jump if grounded
        if (keysPressed.get(" ") && this.isJumping === false) {
            this.velocity.y = -15
            this.isJumping = true
        }

        // TODO apply logic here
        if (
            !keysPressed.get(" ") &&
            this.velocity.y < -this.gravity - 64 &&
            this.isJumping === true
        ) {
            this.velocity.y = -this.gravity - 64
        }
    }

    applyGravity() {
        this.velocity.y += this.level.gravity
    }

    // Override
    checkCollision() {
        const previousVelocityX = this.velocity.x
        const previousVelocityY = this.velocity.y

        for (const elementItem of this.level.elementList) {
            const collidedy = false

            // checks if player is in an object and depending on its previous position (current position - current velocities) it stops the player at the right position

            // inside upper bound: this.position.y > elementItem.position.y-this.sizeY*32
            // inside lower bound: this.position.y < elementItem.position.y + elementItem.sizeY*32
            // inside left: elementItem.position.x-this.sizeX*32 < this.position.x
            // inside right: this.position.x < elementItem.position.x+elementItem.sizeX*32

            // damit in dieser funktion geänderte werte nicht auf folgende if anfragen einfluss haben

            // debug
            // schnittstelle herausfinden (kurvenschnittpunkt)

            // 1. Ein Block darf nicht die y koordinate verändern nachdem er die x koordinate verändert hat
            // 2. Ein anderer Block darf es unter bestimmten Umständen auch nicht (welche?)

            // soweit in die kommende richtung zurück bis es nicht mehr collided
            // oder nicht in den block reingehen

            if (
                elementItem instanceof SolidBlock &&
                this.position.y > elementItem.position.y - this.sizeY * 32 &&
                this.position.y < elementItem.position.y + elementItem.sizeY * 32 &&
                elementItem.position.x - this.sizeX * 32 < this.position.x &&
                this.position.x < elementItem.position.x + elementItem.sizeX * 32
            ) {
                if (
                    this.position.y - previousVelocityY <=
                    elementItem.position.y - this.sizeY * 32
                ) {
                    this.position.y = elementItem.position.y - this.sizeY * 32

                    this.cameraBox.position.y =
                        this.position.y + this.height / 2 - this.cameraBox.height / 2

                    this.velocity.y = 0
                    this.gravity = 0
                    this.isJumping = false

                    // collidedy = true
                }
                if (
                    this.position.y - previousVelocityY >=
                    elementItem.position.y + elementItem.sizeY * 32
                ) {
                    this.position.y = elementItem.position.y + elementItem.sizeY * 32

                    this.cameraBox.position.y =
                        this.position.y + this.height / 2 - this.cameraBox.height / 2

                    this.velocity.y = 0
                    this.gravity = 0

                    // collidedy = true
                }

                if (
                    this.position.x - previousVelocityX <=
                        elementItem.position.x - this.sizeX * 32 &&
                    collidedy === false
                ) {
                    this.position.x = elementItem.position.x - this.sizeX * 32

                    this.cameraBox.position.x =
                        this.position.x + this.width / 2 - this.cameraBox.width / 2

                    this.velocity.x = 0
                }
                if (
                    this.position.x - previousVelocityX >=
                        elementItem.position.x + elementItem.sizeX * 32 &&
                    collidedy === false
                ) {
                    this.position.x = elementItem.position.x + elementItem.sizeX * 32

                    this.cameraBox.position.x =
                        this.position.x + this.width / 2 - this.cameraBox.width / 2

                    this.velocity.x = 0
                }
            }
        }
    }

    // Override
    action() {
        this.changeVelocities()
        this.applyGravity()

        // rounding for more fine grained velocity
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
