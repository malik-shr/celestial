import { MenuButton } from "../button"
import Modal from "./modal"

export default class Help extends Modal {
    constructor(game, canvas) {
        super("Help", 400, 450, game, canvas)

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
        ctx.fillStyle = "white"
        ctx.font = "500 20px Montserrat"
        ctx.textAlign = "left"
        ctx.textBaseline = "middle"

        ctx.fillStyle = "black"
        ctx.fillText(text, position.x, position.y)

        ctx.closePath()
    }

    drawText(ctx, text, position) {
        ctx.fillStyle = "white"
        ctx.font = "500 20px Montserrat"
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

        this.drawText(ctx, "Left", { x: firstCol, y: firstRow })
        this.drawText(ctx, "Arrow Left", { x: firstCol + 150, y: firstRow }, 140, 25)

        this.drawText(ctx, "Right", { x: firstCol, y: firstRow + 40 })
        this.drawText(ctx, "Arrow Right", { x: firstCol + 150, y: firstRow + 40 }, 140, 25)

        this.drawText(ctx, "Up", { x: firstCol, y: firstRow + 80 })
        this.drawText(ctx, "Arrow Up", { x: firstCol + 150, y: firstRow + 80 }, 140, 25)

        this.drawText(ctx, "Down", { x: firstCol, y: firstRow + 120 })
        this.drawText(ctx, "Arrow Down", { x: firstCol + 150, y: firstRow + 120 }, 140, 25)

        this.drawText(ctx, "Dash", { x: firstCol, y: firstRow + 180 })
        this.drawText(ctx, "Shift", { x: firstCol + 150, y: firstRow + 180 }, 140, 25)

        this.drawText(ctx, "Jump", { x: firstCol, y: firstRow + 220 })
        this.drawText(ctx, "Space", { x: firstCol + 150, y: firstRow + 220 }, 140, 25)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
