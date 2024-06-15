import Element from "./element"

export default class Checkpoint extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game
        this.isActive = false
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
        this.game.level.elementList.setPrevCheckpoints(this)
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
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    }
}
