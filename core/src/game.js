import Player from "./engine/player"
import Engine from "./engine/engine"
import GraphicsPipeline from "./graphics/graphicsPipeline"

export class Game {
    counter
    
    // TEMP
    player
    engine
    graphicsPipeline

    constructor() {
        this.counter
    
        // TEMP
        this.player = new Player(240, 160)
        this.engine = new Engine(this.player)
        this.graphicsPipeline = new GraphicsPipeline(this.player)
    }

    start() {
        window.requestAnimationFrame(this.tick.bind(this))
    }

    tick() {
        ++this.counter
        this.engine.engine()
        this.graphicsPipeline.render()

        window.requestAnimationFrame(this.tick.bind(this))

        // Avoid to high number
        if(this.counter >= 100_0000) {
            counter = 0
        }
    }
}