import { keysPressed } from "./store"

export default class Engine {
    player
    game

    constructor(player, game) {
        this.player = player
        this.game = game
    }

    engine() {
        this.handleMovement()
    }

    handleMovement() {
        if(keysPressed.get("ArrowRight")) {
            this.player.x += 3
        }

        if(keysPressed.get("ArrowLeft")) {
            this.player.x -= 3
        }

        if(keysPressed.get(" ")) {
            this.player.y -= 3
            this.player.isJumping = true
        }

        if(keysPressed.get("ArrowUp")) {
            this.player.y -= 3
            this.player.isJumping = true
        }
        
        if(keysPressed.get("ArrowDown")) {
            this.player.y += 3
        }
    }
}