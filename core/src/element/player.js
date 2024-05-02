import { keysPressed } from "../store"
import Element from "./element"
import SolidBlock from "./solidBlock"

export default class Player extends Element {
    velocityX
    velocityY
    gravity

    direction
    isJumping
    level

    constructor(x, y, level) {
        super(x, y)

        this.velocityX = 0
        this.velocityY = 0
        this.isJumping = false
        this.level = level
        this.gravity = 0
    }

    changeVelocities() {
        // gravity accumulates every tick
        this.gravity += this.level.gravity

        // entschleunigung wenn man die jeweilige taste nicht drückt oder man die richtung von links nach rechts oder von rechts nach links wechselt
        // check with velocities not direction
        if(!keysPressed.get("ArrowRight") && !keysPressed.get("ArrowLeft") || 
        keysPressed.get("ArrowRight") && this.velocityX < 0 ||
        keysPressed.get("ArrowLeft") && this.velocityX > 0) {
            this.velocityX = 0
        }

        // beschleunigung wenn man die jeweilige taste drückt
        if(keysPressed.get("ArrowRight") && this.velocityX < 120) {
            this.velocityX += 8
        }

        if(keysPressed.get("ArrowLeft")  && this.velocityX > -120) {
            this.velocityX -= 8
        }

        // second part means you can only jump if grounded
        if(keysPressed.get(" ") && this.isJumping === false) {
            this.velocityY = -150
            this.isJumping = true
        }

        if(!keysPressed.get(" ") && this.velocityY < -this.gravity-64 && this.isJumping === true) {
            this.velocityY = -this.gravity-64
        }
    }

    applyVelocities() {
        // rounding for more fine grained velocity
        this.x += Math.round(this.velocityX / 10)
        this.y +=
            Math.round(this.velocityY / 10) +
            Math.round(this.gravity / 10)
    }

    // Override
    checkCollision(element) {
        // makes sure player doesnt go below ground and resets velocities in y direction
        for (const elementItem of this.level.elementList) {
            // checks if player is in an object and depending on its previous position (current position - current velocities) it stops the player at the right position
            // make it so that the player cant go through blocks if hes too fast 
            // touching upper bound: this.y > elementItem.y-this.sizeY*32
            // touching lower bound: this.y < elementItem.y + elementItem.sizeY*32
            //touching left: elementItem.x-this.sizeX*32 < this.x
            // touching right: this.x < elementItem.x+elementItem.sizeX*32
            if (elementItem.constructor.name != "Player" && this.y > elementItem.y-this.sizeY*32 && this.y < elementItem.y + elementItem.sizeY*32 && 
                elementItem.x-this.sizeX*32 < this.x  && this.x < elementItem.x+elementItem.sizeX*32) {
                if (this.x - (Math.round(this.velocityX / 10)) <= elementItem.x-this.sizeX*32){
                this.x = elementItem.x-this.sizeX*32
                this.velocityX = 0
                }
                if (this.x - (Math.round(this.velocityX / 10)) >= elementItem.x+elementItem.sizeX*32){
                this.x = elementItem.x+elementItem.sizeX*32
                this.velocityX = 0
                }
                if (this.y - (Math.round(this.velocityY / 10) +
                Math.round(this.gravity / 10)) <= elementItem.y-this.sizeY*32){
                this.y = elementItem.y - this.sizeY*32
                this.velocityY = 0
                this.gravity = 0
                this.isJumping = false
                }
                if(this.y - (Math.round(this.velocityY / 10) +
                Math.round(this.gravity / 10)) >= elementItem.y + elementItem.sizeY*32){
                this.y = elementItem.y + elementItem.sizeY*32
                this.velocityY = 0
                this.gravity = 0
                }
            }
    }
}

    // Override
    action() {
        this.changeVelocities()
        this.applyVelocities()
        // check direction
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
