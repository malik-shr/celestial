export default class UILayer {
    constructor(game) {
        this.game = game

        this.canvas = this.game.canvas

        this.startTime = this.game.startTime
        this.player = this.game.player
    }

    drawLayer(ctx) {
        const now = performance.now()

        const elapsed = (now - this.startTime) / 1000

        ctx.fillStyle = "white"
        ctx.font = "14px Montserrat"

        ctx.fillText(this.game.level.name, 250, 20)
        ctx.fillText(elapsed.toFixed(2), 450, 20)
    }
}
