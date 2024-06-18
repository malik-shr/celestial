import { toTime } from "../../utils"
import { MenuButton } from "../button"
import Modal from "./modal"

export default class Stats extends Modal {
    constructor(levelList, game, canvas) {
        super("Stats", 400, 350, game, canvas)

        this.levelList = levelList
        this.stats = levelList.stats

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

    drawText(ctx, text, position, style = "left") {
        ctx.fillStyle = "#e3e3d2"
        ctx.font = "500 18px Montserrat"
        ctx.textAlign = style
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

        const firstCol = this.box.position.x + 40
        const firstRow = this.box.position.y + 60

        if (this.levelList.shouldShowStats()) {
            this.drawText(ctx, "Time", { x: firstCol + 140, y: firstRow + 40 }, "center")
            this.drawText(ctx, "ØTime", { x: firstCol + 260, y: firstRow + 40 }, "center")

            this.drawText(ctx, "Moon", { x: firstCol, y: firstRow + 70 })
            this.drawText(
                ctx,
                toTime(this.levelList.stats.moon.totalBestTime),
                { x: firstCol + 140, y: firstRow + 70 },
                "center"
            )
            this.drawText(
                ctx,
                toTime(this.levelList.stats.moon.averageTime),
                { x: firstCol + 260, y: firstRow + 70 },
                "center"
            )

            this.drawText(ctx, "Mars", { x: firstCol, y: firstRow + 100 })
            this.drawText(
                ctx,
                toTime(this.levelList.stats.mars.totalBestTime),
                { x: firstCol + 140, y: firstRow + 100 },
                "center"
            )
            this.drawText(
                ctx,
                toTime(this.levelList.stats.mars.averageTime),
                { x: firstCol + 260, y: firstRow + 100 },
                "center"
            )

            this.drawText(ctx, "Saturn", { x: firstCol, y: firstRow + 130 })
            this.drawText(
                ctx,
                toTime(this.levelList.stats.saturn.totalBestTime),
                { x: firstCol + 140, y: firstRow + 130 },
                "center"
            )
            this.drawText(
                ctx,
                toTime(this.levelList.stats.saturn.averageTime),
                { x: firstCol + 260, y: firstRow + 130 },
                "center"
            )

            ctx.beginPath()
            ctx.strokeStyle = "#ced4da"
            ctx.moveTo(this.box.position.x + 40, firstRow + 150)
            ctx.lineTo(this.box.position.x + this.width - 40, firstRow + 150)
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.fill()
            ctx.closePath()

            this.drawText(ctx, "Overall", { x: firstCol, y: firstRow + 170 })
            this.drawText(
                ctx,
                toTime(this.levelList.stats.overall.totalBestTime),
                { x: firstCol + 140, y: firstRow + 170 },
                "center"
            )
            this.drawText(
                ctx,
                toTime(this.levelList.stats.overall.averageTime),
                { x: firstCol + 260, y: firstRow + 170 },
                "center"
            )
        } else {
            this.drawText(
                ctx,
                "You have to complete all levels",
                {
                    x: this.box.position.x + this.width / 2,
                    y: firstRow + 40,
                },
                "center"
            )
            this.drawText(
                ctx,
                "to see your stats",
                {
                    x: this.box.position.x + this.width / 2,
                    y: firstRow + 70,
                },
                "center"
            )
        }

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
