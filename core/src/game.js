import LevelList from "./level/levelList"
import { level1 } from "./level/level1"
import Camera from "./camera/camera"
import UILayer from "./ui/uiLayer"
import { Screen, currentScreen } from "./listener/store"
import Menu from "./ui/menu"
import Pause from "./ui/pause"

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx

        this.raf = null

        this.levelList = new LevelList()

        this.menu = new Menu(this.canvas, this.ctx, this)

        this.pause = new Pause(this, canvas)
    }

    start() {
        this.then = this.startTime
        this.raf = window.requestAnimationFrame(this.draw.bind(this))

        this.level = level1

        this.player = this.level.getPlayer()

        this.camera = new Camera(0, 0, this.canvas, this.player)

        this.uiLayer = new UILayer(this)

        this.loop = this.loop.bind(this)

        this.startTime = performance.now()

        this.time = 0

        window.setInterval(this.loop, 1000 / 40)
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    loop() {
        if (this.pause.isActive) return

        this.time = performance.now() - this.startTime - this.pause.time

        this.level.elementList.action()
        this.camera.action()

        this.player.checkCollision()
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if (currentScreen === Screen.Menu) {
            this.menu.openMenu() // TEMPORARY
            this.menu.draw()
        }

        if (currentScreen === Screen.Game) {
            this.ctx.save()

            this.ctx.scale(2, 2)

            this.uiLayer.drawLayer(this.ctx)

            // vielleicht in Camera class verschieben?
            this.ctx.translate(this.camera.position.x, this.camera.position.y)

            this.level.elementList.draw(this.ctx)
            // DEBUG
            //this.camera.draw(this.ctx)

            this.ctx.restore()

            this.tickCounter += 1
        }

        this.pause.draw(this.ctx)

        this.raf = window.requestAnimationFrame(this.draw.bind(this))
    }
}
