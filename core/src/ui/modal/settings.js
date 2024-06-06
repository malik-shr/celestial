import { MenuButton } from "../button"
import Modal from "./modal"

export default class Settings extends Modal {
    constructor(game, canvas) {
        super("Settings", 250, 250, game, canvas)

        this.close = this.close.bind(this)

        const closeButton = new MenuButton(
            this.close,
            this.box.position.x + this.width / 2 - 160 / 2,
            this.box.position.y + this.height - 50 - 20,
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

        super.scaleBox(ctx)
        super.drawBox(ctx)
        super.drawTitle(ctx)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
