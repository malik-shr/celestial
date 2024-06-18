import { MenuButton } from "../button"
import Modal from "./modal"

export default class Help extends Modal {
    constructor(game, canvas) {
        super("Controls", 400, 450, game, canvas)

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

    drawKeyboard(ctx, text, position, width, height) {
        ctx.beginPath()
        ctx.fillStyle = "#e3e3d2"
        ctx.font = "500 18px Montserrat"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"

        ctx.fillStyle = "#160912"
        ctx.fillText(text, position.x, position.y)

        ctx.closePath()
    }

    drawText(ctx, text, position) {
        ctx.fillStyle = "#e3e3d2"
        ctx.font = "500 18px Montserrat"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"

        ctx.fillText(text, position.x, position.y)
    }

    draw(ctx) {
        super.updateFrames(10)

        ctx.beginPath()
        ctx.save()

        super.scaleBox(ctx)
        super.drawBox(ctx)
        super.drawTitle(ctx)

        const firstCol = this.box.position.x + 50
        const firstRow = this.box.position.y + 100

        const secondCol = this.box.position.x + this.width / 2

        this.drawText(ctx, "Move Left", { x: firstCol, y: firstRow })
        this.drawText(ctx, "Arrow Left", { x: firstCol + 150, y: firstRow }, 140, 25)

        this.drawText(ctx, "Move Right", { x: firstCol, y: firstRow + 35 })
        this.drawText(ctx, "Arrow Right", { x: firstCol + 150, y: firstRow + 35 }, 140, 25)

        this.drawText(ctx, "Move Up", { x: firstCol, y: firstRow + 70 })
        this.drawText(ctx, "Arrow Up", { x: firstCol + 150, y: firstRow + 70 }, 140, 25)

        this.drawText(ctx, "Move Down", { x: firstCol, y: firstRow + 105 })
        this.drawText(ctx, "Arrow Down", { x: firstCol + 150, y: firstRow + 105 }, 140, 25)

        this.drawText(ctx, "Dash", { x: firstCol, y: firstRow + 160 })
        this.drawText(ctx, "Shift", { x: firstCol + 150, y: firstRow + 160 }, 140, 25)

        this.drawText(ctx, "Jump", { x: firstCol, y: firstRow + 195 })
        this.drawText(ctx, "Space", { x: firstCol + 150, y: firstRow + 195 }, 140, 25)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
