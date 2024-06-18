import { toTime } from "../utils"

export default class Button {
    constructor(action, x, y, width, height) {
        this.rect = {
            position: {
                x: x,
                y: y,
            },
            width: width,
            height: height,
        }

        this.hover = false
        this.action = action
    }
}

export class MenuButton extends Button {
    constructor(action, x, y, width, height, text, fontSize = 22, type = 1) {
        super(action, x, y, width, height)

        this.bgColor = "#e3e3d2"
        this.bgHover = "#d1d1b5"
        this.color = "#160912"

        if (type === 2) {
            this.bgColor = "#ff5252"
            this.bgHover = "#ff7b7b"
            this.color = "#e3e3d2"
        }

        this.text = text
        this.fontSize = fontSize
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fillStyle = this.hover ? this.bgHover : this.bgColor

        ctx.roundRect(
            this.rect.position.x,
            this.rect.position.y,
            this.rect.width,
            this.rect.height,
            [6]
        )
        ctx.fill()

        ctx.fillStyle = this.color
        ctx.font = `600 ${this.fontSize}px Montserrat`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText(
            this.text,
            this.rect.position.x + this.rect.width / 2,
            this.rect.position.y + this.rect.height / 2
        )

        ctx.closePath()
    }
}

export class TransparentButton extends Button {
    constructor(action, x, y, width, height, text, fontSize = 26) {
        super(action, x, y, width, height)

        this.text = text
        this.fontSize = fontSize
        this.isActive = false
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fill()

        ctx.fillStyle = this.isActive ? (this.hover ? "#d1d1b5" : "#e3e3d2") : "#495057"
        ctx.font = `800 86px Montserrat`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText(
            this.text,
            this.rect.position.x + this.rect.width / 2,
            this.rect.position.y + this.rect.height / 2
        )

        ctx.closePath()
    }
}

export class LevelButton extends Button {
    constructor(action, x, y, menu, meta) {
        super(action, x, y, 30, 30, "")

        this.menu = menu
        this.meta = meta

        this.strokeScale = 0

        this.increaseSize = true

        this.clicked = false
        this.clickedFrames = 0
        this.hoverTick = 0

        this.progress = 0
        this.circleCenter = {
            x: this.rect.position.x + this.rect.width / 2,
            y: this.rect.position.y + this.rect.height / 2,
        }
    }

    updateProgress() {
        if (!this.clicked) {
            this.clickedFrames = 0
        }

        this.progress = this.clickedFrames / 25

        if (this.progress > 1) {
            this.clickedFrames = 0
            this.clicked = false
            this.hover = false
            this.action()
        }

        if (this.increaseSize && this.strokeScale < 1) {
            this.strokeScale += 1 / 25

            if (this.strokeScale >= 1) {
                this.strokeScale = 1
                this.increaseSize = false
            }
        }

        if (!this.increaseSize && this.strokeScale > 0) {
            this.strokeScale -= 1 / 25

            // Rounding Point
            if (this.strokeScale < 0) {
                this.strokeScale = 0
                this.increaseSize = true
            }
        }
    }

    drawHoverBox(ctx) {
        if (this.menu.settings.isActive || this.menu.help.isActive || this.menu.stats.isActive) {
            return
        }

        const box = {
            x: this.rect.position.x + 40,
            y: this.rect.position.y - 130,
            width: 160,
            height: 90,
        }

        const bestTime =
            this.meta.data.best === Number.MAX_SAFE_INTEGER
                ? "-"
                : toTime(parseFloat(this.meta.data.best))

        if (!this.hover) {
            this.hoverTick = 0
        }

        if (this.hover) {
            this.hoverTick += 1 / 12

            if (this.hoverTick > 1) {
                this.hoverTick = 1
            }

            const currentX =
                this.circleCenter.x + (box.x + 2 - this.circleCenter.x) * this.hoverTick
            const currentY =
                this.circleCenter.y +
                (box.y - 2 + box.height - this.circleCenter.y) * this.hoverTick

            ctx.beginPath()

            ctx.strokeStyle = "#ced4da"
            ctx.moveTo(this.circleCenter.x, this.circleCenter.y)
            ctx.lineTo(currentX, currentY)
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.fill()

            if (this.hoverTick < 1) {
                ctx.closePath()
                return
            }

            ctx.fillStyle = "rgba(0,0,0,0.3)"
            ctx.roundRect(box.x, box.y, box.width, box.height, [9])
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.fill()

            ctx.fillStyle = "#e3e3d2"
            ctx.font = "600 20px Montserrat"
            ctx.textAlign = "center"
            ctx.textBaseline = "middle"

            ctx.fillText(this.meta.name, box.x + box.width / 2, box.y + 20)

            ctx.font = "500 18px Montserrat"
            ctx.textAlign = "left"
            ctx.fillText(`🏆${bestTime}`, box.x + 15, box.y + 65)

            ctx.closePath()
        }
    }

    draw(ctx) {
        ++this.clickedFrames

        this.updateProgress()

        ctx.save()

        ctx.beginPath()

        let primaryColor = "#adb5bd"
        let secondaryColor = "#8a9097"
        let hoverColor = "#9ba2aa"

        if (this.meta.unlocked) {
            primaryColor = "#f8f9fa"
            secondaryColor = "#adb5bd"
            hoverColor = "#e9ecef"
        }

        ctx.fillStyle = this.hover ? hoverColor : primaryColor

        ctx.arc(
            this.circleCenter.x,
            this.circleCenter.y,
            this.hover ? this.rect.width / 2 - 1 : this.rect.width / 2,
            0,
            2 * Math.PI,
            false
        )
        ctx.fill()

        ctx.strokeStyle = secondaryColor
        ctx.lineWidth = 3
        if (this.meta.unlocked) {
            ctx.lineWidth = this.hover ? 2 + this.strokeScale * 3 - 1 : 2 + this.strokeScale * 3
        }
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(
            this.circleCenter.x,
            this.circleCenter.y,
            this.rect.width / 2,
            0,
            2 * this.progress * Math.PI
        )
        ctx.strokeStyle = "#487394"
        ctx.lineWidth = 6
        ctx.stroke()

        this.drawHoverBox(ctx)

        ctx.closePath()

        ctx.restore()
    }
}
