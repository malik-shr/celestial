import LevelList from "./level/levelList"
import { level1 } from "./level/level1"

// Singleton class
export default class Game {
    
    levelList
    level

    raf

    canvas
    ctx

    tickCounter
    
    constructor() {
        this.canvas = window.document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")

        this.levelList = new LevelList()
        this.level = level1 // Set to Level 1 as default level

        this.tickCounter = 0
    }

    start() {   
        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    tick() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.level.elementList.action()
        this.level.elementList.draw(this.ctx)
        this.level.elementList.checkCollision()

        this.tickCounter += 1

        //Avoid to high number
        if (this.tickCounter === 100_000) {
            this.tickCounter = 0
        }

        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }
}

