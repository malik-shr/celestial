import Level from "./level/level"
import Camera from "./camera/camera"
import UILayer from "./ui/uiLayer"
import { Screen, currentScreen } from "./listener/store"
import Menu from "./ui/menu"
import Pause from "./ui/modal/pause"
import Sprite from "./element/sprite"
import Completed from "./ui/modal/completed"

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx

        this.raf = null
        this.intervalLoop = null
        this.level = null

        this.menu = new Menu(this, this.canvas)
    }

    start() {
        this.then = this.startTime
        this.raf = window.requestAnimationFrame(this.draw.bind(this))
    }

    startLevel(path = "") {
        if (this.intervalLoop !== null) {
            window.clearInterval(this.intervalLoop)
        }

        this.level = new Level("level1", 0.8, this)
        this.level.initLevel("level1")

        this.completed = new Completed(this, this.canvas)
        this.pause = new Pause(this, this.canvas)

        this.player = this.level.getPlayer()

        this.camera = new Camera(0, 0, this.canvas, this.player)

        this.uiLayer = new UILayer(this)

        this.loop = this.loop.bind(this)

        this.startTime = performance.now()

        this.time = 0

        //this.shootingStar = new Sprite("shooting-star.png", 32, 64, 32, 64)
        this.bg1 = new Sprite("bg/bg.png", 512, 320, 512, 288)
        this.bg2 = new Sprite("bg/bg_layer_top.png", 512, 320, 512, 288)

        this.particles = null

        this.intervalLoop = window.setInterval(this.loop, 1000 / 40)
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    loop() {
        if (this.pause.isActive || this.completed.isActive || currentScreen !== Screen.Game) return

        this.time = performance.now() - this.startTime - this.pause.time

        this.level.elementList.action()
        this.camera.pan()
        this.camera.checkShaking()

        this.player.checkCollision()
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if (currentScreen === Screen.Menu) {
            this.menu.draw(this.ctx)
        }

        if (currentScreen === Screen.Game) {
            this.ctx.save()

            this.ctx.scale(2, 2)

            // vielleicht in Camera class verschieben?
            this.ctx.translate(this.camera.position.x, this.camera.position.y)

            // JUST TESTING!
            this.bg1.draw(this.ctx, 0, 0, {
                x: Math.abs(this.camera.position.x),
                y: -Math.abs(this.camera.position.y),
            })

            for (let i = 0; i < 6; i++) {
                this.bg2.draw(
                    this.ctx,
                    0,
                    0,
                    {
                        x: Math.abs(this.camera.bgLayer.position.x) + 512 * i,
                        y: -Math.abs(this.camera.position.y),
                    },
                    5
                )
            }

            this.level.elementList.draw(this.ctx)

            this.uiLayer.drawLayer(this.ctx)

            if (this.particles !== null) {
                this.particles.animate(this.ctx)
            }
            // DEBUG
            //this.camera.draw(this.ctx)

            this.ctx.restore()
        }

        this.pause.draw(this.ctx)
        this.completed.draw(this.ctx)

        this.raf = window.requestAnimationFrame(this.draw.bind(this))
    }
}
