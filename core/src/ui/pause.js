import { PauseButton } from "./button"
import ButtonList from "./buttonList"

export default class Pause {
    constructor(game, canvas) {
        this.game = game
        this.canvas = canvas

        this.resumeGame = this.resumeGame.bind(this)
        this.exitGame = this.exitGame.bind(this)

        this.width = 250
        this.height = 200

        this.box = {
            position: {
                x: this.canvas.width / 2 - this.width / 2,
                y: this.canvas.height / 2 - this.height / 2,
            },
        }

        window.addEventListener("keyup", (event) => {
            if (event.key === "Escape") {
                if (!this.game.isPaused) {
                    this.game.isPaused = true
                    return
                }

                this.resumeGame()
            }
        })

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = true

        this.resumeBtn = new PauseButton(
            this.resumeGame,
            this.box.position.x,
            this.box.position.y,
            this.width,
            50,
            "Resume"
        )

        this.buttonList.add(this.resumeBtn)
    }

    resumeGame() {
        this.game.isPaused = false
        this.game.start()
    }

    exitGame() {
        console.log("Exit")
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.fillStyle = "rgba(0,0,0,0.7)"
        ctx.fillRect(this.box.position.x, this.box.position.y, this.width, this.height)

        this.resumeBtn.draw(ctx)

        ctx.closePath()
    }
}
