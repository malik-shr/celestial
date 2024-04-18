import Player from "./engine/player"
import Engine from "./engine/engine"
import GraphicsPipeline from "./graphics/graphicsPipeline"

export class Game {
    counter
    player
    engine
    graphicsPipeline
    canvas
    ctx

    constructor(player) {
        this.counter = 0
        this.canvas = window.document.getElementById("canvas")
        this.ctx = canvas.getContext("2d");
        this.player = player
        this.engine = new Engine(this.player) 
        this.graphicsPipeline = new GraphicsPipeline(this.player, this.canvas)
    }

    start() {   
        window.requestAnimationFrame(this.tick.bind(this))
    }

    tick() {
        ++this.counter
        this.engine.engine()
        this.graphicsPipeline.render()

        // Avoid to high number
        if(this.counter >= 100_0000) {
            counter = 0
        }

        window.requestAnimationFrame(this.tick.bind(this))
    }
}

