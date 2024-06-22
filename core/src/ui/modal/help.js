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

        const firstCol = this.box.position.x + 30
        const firstRow = this.box.position.y + 100

        drawText(ctx, "Move Left", { x: firstCol, y: firstRow })
        drawText(ctx, "Arrow Left", { x: firstCol + 150, y: firstRow })

        drawText(ctx, "Move Right", { x: firstCol, y: firstRow + 30 })
        drawText(ctx, "Arrow Right", { x: firstCol + 150, y: firstRow + 30 })

        drawText(ctx, "Move Up", { x: firstCol, y: firstRow + 60 })
        drawText(ctx, "Arrow Up", { x: firstCol + 150, y: firstRow + 60 })

        drawText(ctx, "Move Down", { x: firstCol, y: firstRow + 90 })
        drawText(ctx, "Arrow Down", { x: firstCol + 150, y: firstRow + 90 })

        drawText(ctx, "Dash", { x: firstCol, y: firstRow + 130 })
        drawText(ctx, "Shift", { x: firstCol + 150, y: firstRow + 130 })

        drawText(ctx, "Jump", { x: firstCol, y: firstRow + 160 })
        drawText(ctx, "Space", { x: firstCol + 150, y: firstRow + 160 })

        drawText(ctx, "Godmode", { x: firstCol, y: firstRow + 200 })
        drawText(ctx, "Strg/Left Click/s", { x: firstCol + 150, y: firstRow + 200 })

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
