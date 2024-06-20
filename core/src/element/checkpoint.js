import Element from "./element"
import Sprite from "./sprite"

export default class Checkpoint extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game
        this.isActive = false

        this.sprite = new Sprite("checkpoint.png", 32, 32, 32, 32)
    }

    handleCollisionX(player) {
        this.handleCollision(player)
    }

    handleCollisionY(player) {
        this.handleCollision(player)
    }

    handleCollision(player) {
        if (this.isActive) return

        this.isActive = true
        this.updateRespawnPoint(player)
    }

    updateRespawnPoint(player) {
        player.respawnPoint = {
            x: this.position.x,
            y: this.position.y + this.height - player.height,
        }

        this.game.camera.save()
        this.game.level.write()
    }

    draw(ctx) {
        ctx.beginPath()
        this.sprite.draw(ctx, 0, 0, this.position)
        ctx.closePath()
    }
}
