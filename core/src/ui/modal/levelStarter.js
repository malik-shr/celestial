import { Screen, setCurrentScreen } from "../../listener/store"
import { MenuButton } from "../button"
import Modal from "./modal"

export default class LevelStarter extends Modal {
    constructor(menu, game, canvas, level = "") {
        super(canvas.width / 2 - 200 / 2, canvas.height / 2 - 200 / 2, 200, 200, game, canvas)

        this.menu = menu

        this.level = level

        this.startGame = this.startGame.bind(this)

        const startButton = new MenuButton(
            this.startGame,
            this.box.position.x + this.width / 2 - 80,
            this.box.position.y + this.height - 70,
            160,
            50,
            "Start"
        )

        this.buttonList.add(startButton)

        window.addEventListener("keyup", (event) => {
            if (event.key === "Escape") {
                if (!this.isActive) return

                this.close()
            }
        })
    }

    startGame() {
        this.close()
        this.menu.close()

        setCurrentScreen(Screen.Game)

        this.game.startLevel(this.level)
    }

    open() {
        this.menu.closeModals()

        super.open()
    }

    close() {
        super.close()
    }

    draw(ctx) {
        super.updateFrames(10)

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

        ctx.fillText(this.level, this.box.position.x + this.width / 2, this.box.position.y + 40)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
