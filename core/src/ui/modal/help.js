import { drawText } from "../../utils"
import { MenuButton } from "../button"
import Modal from "./modal"

export default class Help extends Modal {
    constructor(game, canvas) {
        super("Controls", 350, 410, game, canvas)

        this.close = this.close.bind(this)

        const closeButton = new MenuButton(
            this.close,
            this.box.position.x + this.width / 2 - 140 / 2,
            this.box.position.y + this.height - 50 - 25,
            140,
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
        super.drawDimmed(ctx)
        super.updateFrames(10)

        ctx.beginPath()
        ctx.save()

        super.scaleBox(ctx)
        super.drawBox(ctx)
        super.drawTitle(ctx)

        const firstCol = this.box.position.x + 40
        const firstRow = this.box.position.y + 100

        drawText(ctx, "Move Left", { x: firstCol, y: firstRow })
        drawText(ctx, "Arrow Left", { x: firstCol + 150, y: firstRow }, 140, 25)

        drawText(ctx, "Move Right", { x: firstCol, y: firstRow + 35 })
        drawText(ctx, "Arrow Right", { x: firstCol + 150, y: firstRow + 35 }, 140, 25)

        drawText(ctx, "Move Up", { x: firstCol, y: firstRow + 70 })
        drawText(ctx, "Arrow Up", { x: firstCol + 150, y: firstRow + 70 }, 140, 25)

        drawText(ctx, "Move Down", { x: firstCol, y: firstRow + 105 })
        drawText(ctx, "Arrow Down", { x: firstCol + 150, y: firstRow + 105 }, 140, 25)

        drawText(ctx, "Dash", { x: firstCol, y: firstRow + 160 })
        drawText(ctx, "Shift", { x: firstCol + 150, y: firstRow + 160 }, 140, 25)

        drawText(ctx, "Jump", { x: firstCol, y: firstRow + 195 })
        drawText(ctx, "Space", { x: firstCol + 150, y: firstRow + 195 }, 140, 25)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
