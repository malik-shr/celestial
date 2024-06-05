import { MenuButton } from "../button"
import Modal from "./modal"

export default class Settings extends Modal {
    constructor(game, canvas) {
        super(canvas.width / 2 - 250 / 2, canvas.height / 2 - 250 / 2, 250, 250, game, canvas)

        this.close = this.close.bind(this)

        const closeButton = new MenuButton(
            this.close,
            this.box.position.x + this.width / 2 - 80,
            this.box.position.y + this.height - 70,
            160,
            50,
            "Close"
        )

        this.buttonList.add(closeButton)

        window.addEventListener("keyup", (event) => {
            if (event.key === "Escape") {
                if (!this.isActive) return

                this.close()
            }
        })
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

        ctx.fillStyle = "#487394"
        ctx.roundRect(this.box.position.x, this.box.position.y, this.width, this.height, [15])
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.font = "800 26px Montserrat"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText("Settings", this.box.position.x + this.width / 2, this.box.position.y + 40)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
