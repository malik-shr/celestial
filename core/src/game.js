import LevelList from "./level/levelList"
import { level1 } from "./level/level1"
import Camera from "./camera/camera"

// import pixilart_sprite from "D:UniProjektseminarcorepublicpixilart_sprite.png"
// import pixilart_spriteleft from "../public/pixilart_spriteleft.png"

export default class Game {
    constructor() {
        this.canvas = window.document.querySelector("canvas")
        this.canvas.width = 800
        this.canvas.height = 448

        this.ctx = this.canvas.getContext("2d")

        this.raf = null

        this.levelList = new LevelList()
        this.level = level1 // Set to Level 1 as default level

        this.tickCounter = 0
        this.startTime = performance.now()
        this.then = 0

        this.player = this.level.getPlayer()

        this.camera = new Camera(0, 0, this.canvas, this.player)
    }

    start() {
        this.then = this.startTime
        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    tick() {
        const now = performance.now()

        const elapsed = now - this.then

        // caps to about 60 fps
        if (elapsed > 1000 / 60) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.save()

            this.level.elementList.action()
            this.camera.action()

            this.player.checkCollision()

            // vielleicht in Camera class verschieben?
            this.ctx.translate(this.camera.position.x, this.camera.position.y)

            this.level.elementList.draw(this.ctx)
            // DEBUG
            this.camera.draw(this.ctx)

            this.ctx.restore()

            this.tickCounter += 1

            this.then = now - (elapsed % 1000) / 60
        }

        this.raf = window.requestAnimationFrame(this.tick.bind(this))
    }
}
