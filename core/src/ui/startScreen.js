import Sprite from "../element/sprite"
import { Screen, setCurrentScreen } from "../listener/store"
import ButtonList from "./buttonList"

export default class StartScreen {
    constructor(menu, canvas) {
        this.menu = menu
        this.canvas = canvas

        this.isActive = false

        this.bg = new Sprite("menu/bg.png", 1024, 640, 1024, 640)
        this.logo = new Sprite("menu/logo.png", 448, 280, 1024, 640)

        this.start = this.start.bind(this)

        this.buttonList = new ButtonList(canvas)

        this.opacity = 0
        this.fadeIn = true

        window.addEventListener("keyup", (event) => {
            if (!this.isActive) return

            this.start()
        })
    }

    draw(ctx) {
        if (this.opacity < 1 && this.fadeIn) {
            this.opacity += 0.008

            if (this.opacity >= 1) {
                this.opacity = 1
                this.fadeIn = false
            }
        }

        if (!this.fadeIn) {
            this.opacity -= 0.008

            if (this.opacity <= 0.3) {
                this.opacity = 0.3
                this.fadeIn = true
            }
        }

        this.bg.draw(ctx, 0, 0, { x: 0, y: 0 })
        this.logo.draw(ctx, 0, 0, { x: this.canvas.width / 2 - this.logo.width / 2, y: 80 })

        ctx.fillStyle = `rgba(227, 227, 210, ${this.opacity})`
        ctx.font = `500 36px Montserrat`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText("Press any key...", this.canvas.width / 2, this.canvas.height / 2 + 60)
    }

    start() {
        this.close()

        setCurrentScreen(Screen.Menu)
        this.menu.open()
    }

    open() {
        this.isActive = true
        this.buttonList.isActive = true
        setCurrentScreen(Screen.Start)
    }

    close() {
        this.isActive = false
        this.buttonList.isActive = false
    }
}
