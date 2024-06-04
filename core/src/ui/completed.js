import { Screen, setCurrentScreen } from "../listener/store"
import { PauseButton } from "./button"
import ButtonList from "./buttonList"

export default class Completed {
    constructor(game, canvas) {
        this.game = game
        this.canvas = canvas

        this.scale = 0

        this.back = this.back.bind(this)

        this.isActive = false

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = false

        this.width = 300
        this.height = 300

        this.box = {
            position: {
                x: this.canvas.width / 2 - this.width / 2,
                y: this.canvas.height / 2 - this.height / 2,
            },
        }

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
        this.close()
        this.game.menu.open()

        setCurrentScreen(Screen.Menu)
    }

    open() {
        this.isActive = true
        this.buttonList.isActive = true
    }

    close() {
        this.isActive = false
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

        ctx.fillText(
            "Level Completed",
            this.box.position.x + this.width / 2,
            this.box.position.y + 40
        )

        ctx.fillText("Time:", this.box.position.x + this.width / 2, this.box.position.y + 120)

        ctx.fillText(
            (this.game.time / 1000).toFixed(2),
            this.box.position.x + this.width / 2,
            this.box.position.y + 160
        )

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
