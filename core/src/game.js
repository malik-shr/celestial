import Engine from "./engine/engine"
import Player from "./engine/player"
import LevelList from "./level/levelList"
import GraphicsPipeline from "./graphics/graphicsPipeline"
import { level1 } from "./level/level1"

// Singleton class
export default class Game {
    
    player
    
    engine
    graphicsPipeline

    levelList
    level

    raf
    gravity
    tickCounter
    

    constructor() {
        this.raf         
        this.player = new Player(100, 250)
        this.gravity = 0
        this.levelList = new LevelList()
        this.level = level1 // Set to Level 1 as default level

        this.engine = new Engine(this.player, this) 
        this.graphicsPipeline = new GraphicsPipeline(this.player, this)
        this.tickCounter = 0
    }

    start() {   
        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    tick() {
        this.engine.engine(this.tickCounter)
        this.graphicsPipeline.render(this.tickCounter)
        this.tickCounter += 1

        //Avoid to high number
        if (this.tickCounter === 100_000) {
            this.tickCounter = 0
        }

        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }
}

