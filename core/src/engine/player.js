import { keysPressed } from "../store"

export default class Player{
    
    x
    y
    
    velocityX
    velocityY

    direction
    isJumping

    constructor(x, y) {
        this.x = x
        this.y = y
        this.velocityX = 0
        this.velocityY = 0
        this.isJumping = false
    }

    changeVelocities(game, groundPosition) {
        // gravity accumulates every tick
        game.gravity += 2

        // beschleunigung wenn man die jeweilige taste drückt
        if(keysPressed.get("ArrowRight") && this.velocityX < 50) {
            this.velocityX += 1.5
        }

        if(keysPressed.get("ArrowLeft")  && this.velocityX > -50) {
            this.velocityX -= 1.5
        }

        // entschleunigung wenn man die jeweilige taste nicht drückt
        if(!keysPressed.get("ArrowRight") && this.velocityX > 1.5) {
            this.velocityX -= 1.5 
        }

        if(!keysPressed.get("ArrowLeft") && this.velocityX < -1.5) {
            this.velocityX += 1.5 
        }

        // second part means you can only jump if grounded
        if(keysPressed.get(" ") && this.y === groundPosition) {
            this.velocityY -= 75
        }

        if(keysPressed.get("ArrowUp") && this.y === groundPosition) {
            this.velocityY -= 75
        }
    }

    applyVelocities(game) {
        // rounding for more fine grained velocity 
        this.x += Math.round(this.velocityX/10)
        this.y += Math.round(this.velocityY/10) + Math.round(game.gravity/10)
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.x, this.y, 50, 50);
        ctx.fillStyle = "red";
        ctx.fill(); 
        ctx.closePath()
    }
}