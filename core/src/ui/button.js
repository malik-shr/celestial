import { Screen, setCurrentScreen } from "../listener/store"

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
    constructor(action, x, y, width, height, text, fontSize = 26) {
        super(action, x, y, width, height)

        this.text = text
        this.fontSize = fontSize
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fillStyle = this.hover ? "rgba(200,200,200,1)" : "rgba(240,240,240,1)"

        ctx.roundRect(
            this.rect.position.x,
            this.rect.position.y,
            this.rect.width,
            this.rect.height,
            [6]
        )
        ctx.fill()

        ctx.fillStyle = "black"
        ctx.font = `500 ${this.fontSize}px Montserrat`
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

export class SlideButton extends Button {
    constructor(action, x, y, width, height, text, fontSize = 26) {
        super(action, x, y, width, height)

        this.text = text
        this.fontSize = fontSize
        this.isActive = false
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fill()

        ctx.fillStyle = this.isActive ? (this.hover ? "#adb5bd" : "#f8f9fa") : "#495057"
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
    constructor(action, x, y, level) {
        super(action, x, y, 30, 30, "")

        this.level = level

        this.strokeScale = 0

        this.increaseSize = true

        this.clicked = false
        this.clickedFrames = 0
    }

    draw(ctx) {
        ++this.clickedFrames

        if (!this.clicked) {
            this.clickedFrames = 0
        }

        const progress = this.clickedFrames / 40

        if (progress > 1) {
            this.clickedFrames = 0
            this.clicked = false
            this.action()
        }

        const circleCenter = {
            x: this.rect.position.x + this.rect.width / 2,
            y: this.rect.position.y + this.rect.height / 2,
        }

        if (this.increaseSize && this.strokeScale < 1) {
            this.strokeScale += 1 / 40

            if (this.strokeScale >= 1) {
                this.strokeScale = 1
                this.increaseSize = false
            }
        }

        if (!this.increaseSize && this.strokeScale > 0) {
            this.strokeScale -= 1 / 40

            // Rounding Point
            if (this.strokeScale < 0) {
                this.strokeScale = 0
                this.increaseSize = true
            }
        }

        ctx.save()

        ctx.beginPath()
        ctx.fillStyle = this.hover ? "#e9ecef" : "#f8f9fa"
        ctx.arc(
            circleCenter.x,
            circleCenter.y,
            this.hover ? this.rect.width / 2 - 1 : this.rect.width / 2,
            0,
            2 * Math.PI,
            false
        )
        ctx.fill()

        ctx.strokeStyle = "#adb5bd"
        ctx.lineWidth = this.hover ? 2 + this.strokeScale * 3 - 1 : 2 + this.strokeScale * 3
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(circleCenter.x, circleCenter.y, this.rect.width / 2, 0, 2 * progress * Math.PI)
        ctx.strokeStyle = "#487394"
        ctx.lineWidth = 6
        ctx.stroke()
        ctx.closePath()

        if (this.hover) {
            ctx.beginPath()
            ctx.fillStyle = "white"
            ctx.font = "500 16px Montserrat"
            ctx.textAlign = "left"
            ctx.textBaseline = "middle"

            ctx.fillText(this.level, this.rect.position.x + 20, this.rect.position.y - 15)
            ctx.closePath()
        }

        ctx.restore()
    }
}

export class PauseButton extends Button {
    constructor(action, x, y, width, height, text) {
        super(action, x, y, width, height)

        this.text = text
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fillStyle = this.hover ? "rgba(250, 250, 250, 0.3)" : "rgba(0,0,0,0)"

        ctx.fillRect(this.rect.position.x, this.rect.position.y, this.rect.width, this.rect.height)

        ctx.fillStyle = "white"
        ctx.font = "500 20px Montserrat"
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
