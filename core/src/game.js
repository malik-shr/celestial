import LevelList from "./level/levelList"
import { level1 } from "./level/level1"
import Player from "./element/player"
import KeyboardListener from "./listener/keyboardListener"
import Camera from "./camera/camera"

// Singleton class
export default class Game {
    levelList
    level

    raf

    canvas
    ctx

    tickCounter
    startTime
    elapsed
    now
    then

    player

    camera
    keyboardListener

    constructor() {
        this.canvas = window.document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")

        this.levelList = new LevelList()
        this.level = level1 // Set to Level 1 as default level

        this.tickCounter = 0
        this.startTime = performance.now()

        this.player = this.getPlayer()

        this.camera = new Camera(0, 0, this.canvas, this.player)

        this.keyboardListener = new KeyboardListener()

        window.addEventListener("keydown", (event) => this.keyboardListener.handleKeyDown(event))
        window.addEventListener("keyup", (event) => this.keyboardListener.handleKeyUp(event))
    }

    start() {
        this.then = this.startTime
        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    tick() {
        this.now = performance.now()

        this.elapsed = this.now - this.then

        // caps to about 60 fps
        if (this.elapsed > 1000 / 60) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.save()

            this.level.elementList.action()

            this.player.checkCollision()

            this.camera.pan()

            // vielleicht in Camera class verschieben?
            this.ctx.translate(this.camera.position.x, this.camera.position.y)

            this.level.elementList.draw(this.ctx)

            this.ctx.restore()

            this.tickCounter += 1

            this.then = this.now - (this.elapsed % 1000) / 60
        }

        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }

    getPlayer() {
        for (const element of this.level.elementList) {
            if (element instanceof Player) {
                return element
            }
        }

        return null
    }
}
