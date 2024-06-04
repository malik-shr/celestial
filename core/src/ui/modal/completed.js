import { Screen, setCurrentScreen } from "../../listener/store"
import { PauseButton } from "../button"
import Modal from "./modal"

export default class Completed extends Modal {
    constructor(game, canvas) {
        super(canvas.width / 2 - 300 / 2, canvas.height / 2 - 300 / 2, 300, 300, game, canvas)
        this.game = game
        this.canvas = canvas

        this.back = this.back.bind(this)

        const positionY = this.box.position.y + this.height / 2 - 40

        this.backBtn = new PauseButton(
            this.back,
            this.box.position.x,
            positionY + 100,
            this.width,
            50,
            "Next"
        )

        this.buttonList.add(this.backBtn)
    }

    back() {
        super.close()
        this.game.menu.open()

        setCurrentScreen(Screen.Menu)
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

        ctx.fillText(
            "Level Completed",
            this.box.position.x + this.width / 2,
            this.box.position.y + 40
        )

        ctx.fillText("Time:", this.box.position.x + this.width / 2, this.box.position.y + 120)

        ctx.fillText(
            `${(this.game.time / 1000).toFixed(1)}s`,
            this.box.position.x + this.width / 2,
            this.box.position.y + 160
        )

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
