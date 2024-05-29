export default class UILayer {
    constructor(game) {
        this.game = game

        this.canvas = this.game.canvas

        this.startTime = this.game.startTime
        this.player = this.game.player
    }

    drawLayer(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "14px Montserrat"
        ctx.textAlign = "center"

        ctx.fillText(this.game.level.name, 250, 20)
        ctx.fillText((this.game.time / 1000).toFixed(2), 450, 20)
    }
}
