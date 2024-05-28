import { PauseButton } from "./button"
import ButtonList from "./buttonList"

export default class Pause {
    constructor(game, canvas) {
        this.game = game
        this.canvas = canvas

        this.scale = 0

        this.isActive = true

        this.resumeGame = this.resumeGame.bind(this)
        this.exitGame = this.exitGame.bind(this)

        this.width = 250
        this.height = 250

        this.box = {
            position: {
                x: this.canvas.width / 2 - this.width / 2,
                y: this.canvas.height / 2 - this.height / 2,
            },
        }

        window.addEventListener("keyup", (event) => {
            if (event.key === "Escape") {
                if (!this.isActive) {
                    this.isActive = true
                    return
                }

                this.resumeGame()
            }
        })

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = true

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
            this.resumeGame,
            this.box.position.x,
            positionY + 55,
            this.width,
            50,
            "Exit"
        )

        this.buttonList.add(this.resumeBtn)
        this.buttonList.add(this.exitBtn)
    }

    resumeGame() {
        this.isActive = false
    }

    exitGame() {
        console.log("Exit")
    }

    draw(ctx) {
        ctx.save()

        if (this.isActive && this.scale < 1) {
            this.scale += 1 / 5
        }

        if (!this.isActive && this.scale > 0) {
            this.scale -= 1 / 5

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

        ctx.fillStyle = "rgba(0,0,0,0.7)"
        ctx.roundRect(this.box.position.x, this.box.position.y, this.width, this.height, [10])
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.font = "bold 26px sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText("Pause", this.box.position.x + this.width / 2, this.box.position.y + 40)

        this.buttonList.draw(ctx)

        ctx.restore()
    }
}
