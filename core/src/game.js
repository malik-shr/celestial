import Engine from "./engine/engine"
import Player from "./engine/player"
import GraphicsPipeline from "./graphics/graphicsPipeline"
import { level1 } from "./levels/level1"

export class Game {
    raf
    player
    engine
    graphicsPipeline
    level
    levelList

    constructor(levelList) {
        this.raf         
        this.player = new Player(240, 160)


        this.levelList = levelList
        this.level = level1 // Set to Level 1 by default fe

        this.engine = new Engine(this.player, this) 
        this.graphicsPipeline = new GraphicsPipeline(this.player, this)
    }

    start() {   
        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    tick() {
        this.engine.engine()
        this.graphicsPipeline.render()

        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }
}

