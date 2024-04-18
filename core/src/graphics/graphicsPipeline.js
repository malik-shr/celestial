export default class GraphicsPipeline{
    player
    canvas
    ctx

    constructor(player, canvas) {
        this.player = player
        this.canvas = canvas
        this.ctx = canvas.getContext("2d");
    }
    
    render() {
        // clears the canvas each time render is called
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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