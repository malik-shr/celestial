export default class GraphicsPipeline{
    player
    canvas
    ctx

    constructor(player, game) {
        this.player = player
        this.game = game

        this.canvas = window.document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")
    }
    
    render(tickCounter) {
        // clears the canvas each time render is called
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx)
        this.game.level.draw(this.ctx)
    }
}