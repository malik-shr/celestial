import { keysPressed } from "../store"

export default class Engine {
    player
    game
    gravity
    groundPosition

    constructor(player, game) {
        this.player = player
        this.game = game
        this.gravity = 0
        // depends on canvas height and cube size (canvas height - cube size)
        this.groundPosition = 250
    }

    engine(tickCounter) {
        this.changeVelocities()
        this.applyVelocities()
        this.checkCollision()
    }

    changeVelocities() {
        // gravity accumulates every tick
        this.gravity = this.gravity + 2

        // beschleunigung wenn man die jeweilige taste drückt
        if(keysPressed.get("ArrowRight") && this.player.velocityX < 50) {
            this.player.velocityX += 1.5
        }

        if(keysPressed.get("ArrowLeft")  && this.player.velocityX > -50) {
            this.player.velocityX -= 1.5
        }

        // entschleunigung wenn man die jeweilige taste nicht drückt
        if(!keysPressed.get("ArrowRight") && this.player.velocityX > 1.5) {
            this.player.velocityX -= 1.5 
        }

        if(!keysPressed.get("ArrowLeft") && this.player.velocityX < -1.5) {
            this.player.velocityX += 1.5 
        }

        // second part means you can only jump if grounded
        if(keysPressed.get(" ") && this.player.y === this.groundPosition) {
            this.player.velocityY -= 75
            this.player.isJumping = true
        }

        if(keysPressed.get("ArrowUp") && this.player.y === this.groundPosition) {
            this.player.velocityY -= 75
            this.player.isJumping = true
        }
    }

    applyVelocities() {
        // rounding for more fine grained velocity 
        this.player.x += Math.round(this.player.velocityX/10)
        this.player.y += Math.round(this.player.velocityY/10) + Math.round(this.gravity/10)
    }

    checkCollision() {
        // makes sure player doesnt go below ground and resets velocities in y direction
        if (this.player.y >= this.groundPosition){
            this.player.y = this.groundPosition
            this.player.velocityY = 0
            this.gravity = 0
        }
    }
}