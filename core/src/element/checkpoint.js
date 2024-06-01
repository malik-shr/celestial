import Element from "./element"

export default class Checkpoint extends Element {
    constructor(x, y, game, relativeWidth = 1, relativeHeight = 1) {
        super(x, y, relativeWidth, relativeHeight)

        this.game = game
    }

    handleCollisionX(player) {
        this.updateRespawnPoint(player)
    }

    handleCollisionY(player) {
        this.updateRespawnPoint(player)
    }

    updateRespawnPoint(player) {
        player.respawnPoint = {
            x: this.position.x,
            y: this.position.y + this.height - player.height,
        }

        this.game.camera.save()
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    }
}
