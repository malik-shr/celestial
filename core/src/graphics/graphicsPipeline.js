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
    
    render() {
        // clears the canvas each time render is called
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderPlayer()
    }

    renderPlayer() {
        this.ctx.beginPath()
        this.ctx.rect(this.player.x, this.player.y, 50, 50);
        this.ctx.fillStyle = "red";
        this.ctx.fill(); 
        this.ctx.closePath()
    }
}