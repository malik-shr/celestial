export default class Engine {
    
    player
    game
    // Temporary
    groundPosition

    constructor(player, game) {
        this.player = player
        this.game = game
        // depends on canvas height and cube size (canvas height - cube size)
        this.groundPosition = 250
    }

    engine(tickCounter) {
        this.player.changeVelocities(this.game, this.groundPosition)
        this.player.applyVelocities(this.game)

        this.checkCollision()
    }

    // Temporary until level and elements logic is implemented
    checkCollision() {
        // makes sure player doesnt go below ground and resets velocities in y direction
        if (this.player.y >= this.groundPosition){
            this.player.y = this.groundPosition
            this.player.velocityY = 0
            this.game.gravity = 0
        }
    }
}