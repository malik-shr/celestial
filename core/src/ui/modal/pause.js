import { Screen, currentScreen } from "../../listener/store"
import { PauseButton } from "../button"
import Modal from "./modal"

export default class Pause extends Modal {
    constructor(game, canvas) {
        super(canvas.width / 2 - 250 / 2, canvas.height / 2 - 250 / 2, 250, 250, game, canvas)

        this.resumeGame = this.resumeGame.bind(this)
        this.exitGame = this.exitGame.bind(this)

        this.openTime = 0
        this.time = 0
        this.closeTime = 0

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
    }

    open() {
        super.open()

        this.startTime = performance.now()
        this.alreadyOpened = true
        this.openTime = performance.now()
    }

    close() {
        super.close()

        this.time += performance.now() - this.startTime
        this.closeTime = performance.now()
    }

    draw(ctx) {
        super.updateFrames()

        ctx.beginPath()
        ctx.save()

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
