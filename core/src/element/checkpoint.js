import Element from "./element"
import Sprite from "./sprite"
export default class Checkpoint extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game
        this.isActive = false
        this.checkPointRed = new Sprite("checkPoint.png", this.width, this.height, 70, 70)
        this.checkPointGreen = new Sprite("checkPointGreen.png", this.width, this.height, 70, 70)
        this.currentSprite = this.checkPointRed
    }

    handleCollisionX(player) {
        if (this.isActive) return

        this.isActive = true
        this.updateRespawnPoint(player)
    }

    handleCollisionY(player) {
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
        if (this.isActive) {
            this.currentSprite = this.checkPointGreen
        } else this.currentSprite = this.checkPointRed

        this.currentSprite.draw(ctx, this.currentFrame, 0, this.position)

        // ctx.beginPath()
        // ctx.rect(this.position.x, this.position.y, this.width, this.height)
        // ctx.fillStyle = "yellow"
        // ctx.fill()
        // ctx.closePath()
    }
}
