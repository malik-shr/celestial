import { Screen, currentScreen, setCurrentScreen } from "../listener/store"
import { PauseButton } from "./button"
import ButtonList from "./buttonList"

export default class Pause {
    constructor(game, canvas) {
        this.game = game
        this.canvas = canvas

        this.scale = 0

        this.resumeGame = this.resumeGame.bind(this)
        this.exitGame = this.exitGame.bind(this)

        this.isActive = false

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = false

        this.openTime = 0
        this.time = 0
        this.closeTime = 0

        this.width = 250
        this.height = 250

        this.box = {
            position: {
                x: this.canvas.width / 2 - this.width / 2,
                y: this.canvas.height / 2 - this.height / 2,
            },
        }

        window.addEventListener("keyup", (event) => {
            if (currentScreen !== Screen.Game || this.game.completed.isActive) return

            if (event.key === "Escape") {
                if (!this.isActive) {
                    this.open()
                    return
                }

                this.resumeGame()
            }
        })
        const positionY = this.box.position.y + this.height / 2 - 40

        this.resumeBtn = new PauseButton(
            this.resumeGame,
            this.box.position.x,
            positionY,
            this.width,
            50,
            "Resume"
        )

        this.exitBtn = new PauseButton(
            this.exitGame,
            this.box.position.x,
            positionY + 55,
            this.width,
            50,
            "Exit Game"
        )

        this.buttonList.add(this.resumeBtn)
        this.buttonList.add(this.exitBtn)
    }

    resumeGame() {
        this.close()
    }

    exitGame() {
        this.close()
        this.game.menu.open()

        setCurrentScreen(Screen.Menu)
    }

    open() {
        this.startTime = performance.now()

        this.alreadyOpened = true

        this.isActive = true
        this.openTime = performance.now()
        this.buttonList.isActive = true
    }

    close() {
        this.time += performance.now() - this.startTime
        this.isActive = false

        this.closeTime = performance.now()
        this.buttonList.isActive = false
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.save()

        if (this.isActive && this.scale < 1) {
            this.scale += 1 / 20
        }

        if (!this.isActive && this.scale > 0) {
            this.scale -= 1 / 20

            // Rounding Point
            if (this.scale < 0) {
                this.scale = 0
            }
        }

        ctx.scale(this.scale, this.scale)
        ctx.setTransform(
            this.scale,
            0,
            0,
            this.scale,
            (-(this.scale - 1) * this.canvas.width) / 2,
            (-(this.scale - 1) * this.canvas.height) / 2
        )

        ctx.fillStyle = "rgba(144, 238, 144, 1)"

        ctx.roundRect(this.box.position.x, this.box.position.y, this.width, this.height, [15])
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.font = "800 26px Montserrat"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText("Pause", this.box.position.x + this.width / 2, this.box.position.y + 40)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
