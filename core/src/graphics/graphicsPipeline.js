export default class GraphicsPipeline{
    player

    constructor(player) {
        this.player = player
    }
    
    render() {
        const canvas = window.document.getElementById("canvas")
        const ctx = canvas.getContext("2d");
        
        this.renderPlayer(ctx)
    }

    renderPlayer(ctx) {
        ctx.fillRect(this.player.x, this.player.y, 20, 20)
    }
}