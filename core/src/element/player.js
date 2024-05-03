import Element from "./element"

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

            width: 400,
            height: 160,
        }
    }

    shouldPanCameraToTheLeft(canvas, camera) {
        const cameraBoxRightSide =
            this.cameraBox.position.x + this.cameraBox.width

        if (cameraBoxRightSide >= canvas.width + Math.abs(camera.position.x)) {
            camera.position.x -= Math.round(this.velocity.x / 10)
        }
    }

    shouldPanCameraToTheRight(canvas, camera) {
        if (this.cameraBox.position.x <= 0) return

        if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
            camera.position.x -= Math.round(this.velocity.x / 10)
        }
    }

    // Override
    checkCollision(element) {
        // makes sure player doesnt go below ground and resets velocities in y direction
        for (const elementItem of this.level.elementList) {
            // checks if player is in an object and depending on its previous position (current position - current velocities) it stops the player at the right position
            // make it so that the player cant go through blocks if hes too fast
            // touching upper bound: this.position.y > elementItem.position.y-this.sizeY*32
            // touching lower bound: this.position.y < elementItem.position.y + elementItem.sizeY*32
            //touching left: elementItem.position.x-this.sizeX*32 < this.position.x
            // touching right: this.position.x < elementItem.position.x+elementItem.sizeX*32
            if (
                elementItem.constructor.name !== "Player" &&
                this.position.y > elementItem.position.y - this.sizeY * 32 &&
                this.position.y <
                    elementItem.position.y + elementItem.sizeY * 32 &&
                elementItem.position.x - this.sizeX * 32 < this.position.x &&
                this.position.x <
                    elementItem.position.x + elementItem.sizeX * 32
            ) {
                if (
                    this.position.x - Math.round(this.velocity.x / 10) <=
                    elementItem.position.x - this.sizeX * 32
                ) {
                    this.position.x = elementItem.position.x - this.sizeX * 32
                    this.velocity.x = 0
                }
                if (
                    this.position.x - Math.round(this.velocity.x / 10) >=
                    elementItem.position.x + elementItem.sizeX * 32
                ) {
                    this.position.x =
                        elementItem.position.x + elementItem.sizeX * 32
                    this.velocity.x = 0
                }
                if (
                    this.position.y -
                        (Math.round(this.velocity.y / 10) +
                            Math.round(this.gravity / 10)) <=
                    elementItem.position.y - this.sizeY * 32
                ) {
                    this.position.y = elementItem.position.y - this.sizeY * 32
                    this.velocity.y = 0
                    this.gravity = 0
                    this.isJumping = false
                }
                if (
                    this.position.y -
                        (Math.round(this.velocity.y / 10) +
                            Math.round(this.gravity / 10)) >=
                    elementItem.position.y + elementItem.sizeY * 32
                ) {
                    this.position.y =
                        elementItem.position.y + elementItem.sizeY * 32
                    this.velocity.y = 0
                    this.gravity = 0
                }
            }
        }
    }

    // Override
    action() {
        // rounding for more fine grained velocity
        this.position.x += Math.round(this.velocity.x / 10)
        this.position.y +=
            Math.round(this.velocity.y / 10) + Math.round(this.gravity / 10)

        this.cameraBox.position.x =
            this.position.x + this.width / 2 - this.cameraBox.width / 2
        this.cameraBox.position.y =
            this.position.y + this.height / 2 - this.cameraBox.height / 2
        // check direction
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
