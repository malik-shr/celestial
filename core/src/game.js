import Level from "./level/level"
import Camera from "./camera/camera"
import UILayer from "./ui/uiLayer"
import { Screen, currentScreen, setCurrentScreen } from "./listener/store"
import Menu from "./ui/menu"
import Pause from "./ui/modal/pause"
import Sprite from "./element/sprite"
import Completed from "./ui/modal/completed"
import LevelList from "./level/levellist"
import KeyboardListener from "./listener/keyboardListener"

export default class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx

        this.raf = null
        this.intervalLoop = null
        this.level = null

        this.levelList = new LevelList()

        this.menu = new Menu(this.levelList, this, this.canvas)

        this.keyboardListener = new KeyboardListener(this)

        this.pause = null
    }

    start() {
        this.then = this.startTime
        this.raf = window.requestAnimationFrame(this.draw.bind(this))
    }

    async startLevel(levelMeta) {
        if (this.intervalLoop !== null) {
            window.clearInterval(this.intervalLoop)
        }

        this.savedTime = 0

        this.level = new Level(levelMeta, levelMeta.planet, this)
        await this.level.initLevel(levelMeta)

        this.completed = new Completed(this, this.canvas)
        this.pause = new Pause(this.levelList, this, this.canvas)

        this.player = this.level.getPlayer()

        this.camera = new Camera(0, 0, this.canvas, this.player)

        this.uiLayer = new UILayer(this)

        this.loop = this.loop.bind(this)

        this.startTime = performance.now()

        this.time = 0

        this.level.loadLevel(levelMeta)

        this.intervalLoop = window.setInterval(this.loop, 1000 / 40)

        setCurrentScreen(Screen.Game)
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
    }

    loop() {
        if (this.pause.isActive || this.completed.isActive || currentScreen !== Screen.Game) return

        const timeInS =
            (performance.now() - this.startTime - this.pause.time + this.savedTime * 1000) / 1000
        this.time = timeInS.toFixed(1)

        this.level.elementList.action()

        this.player.checkCollision()

        this.camera.pan()
        this.camera.checkShaking()

        this.level.clean()
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if (currentScreen === Screen.Menu) {
            this.menu.draw(this.ctx)
        }

        if (currentScreen === Screen.Game) {
            this.ctx.save()

            this.level.drawBackground(this.ctx)

            this.ctx.scale(2, 2)

            // vielleicht in Camera class verschieben?
            this.ctx.translate(this.camera.position.x, this.camera.position.y)

            // JUST TESTING!

            this.level.elementList.draw(this.ctx)

            this.uiLayer.drawLayer(this.ctx)

            // DEBUG
            //this.camera.draw(this.ctx)

            this.ctx.restore()

            this.pause.draw(this.ctx)
            this.completed.draw(this.ctx)
        }

        this.raf = window.requestAnimationFrame(this.draw.bind(this))
    }
}
