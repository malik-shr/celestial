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
    constructor(action, x, y, width, height, text) {
        super(action, x, y, width, height)

        this.text = text
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

export class LevelButton extends Button {
    constructor(action, x, y, level) {
        super(action, x, y, 15, 15, "")

        this.isActive = false
        this.canvas = level
        this.zoomTick = 0
        this.level = level

        this.currentTransformedCursor = null
    }

    getTransformedPoint(ctx, x, y) {
        const originalPoint = new DOMPoint(x, y)
        return ctx.getTransform().invertSelf().transformPoint(originalPoint)
    }

    draw(ctx) {
        const circleCenter = {
            x: this.rect.position.x + this.rect.width / 2,
            y: this.rect.position.y + this.rect.height / 2,
        }

        // Get the transformed point after applying the current transformation

        ctx.beginPath()
        ctx.save() // Save the current context state

        if (this.startLevel) {
            ++this.zoomTick

            // Adjust the scale over time to create the zoom effect
            const scale = 1 + this.zoomTick / 10

            const transformedPoint = this.getTransformedPoint(ctx, circleCenter.x, circleCenter.y)

            ctx.translate(transformedPoint.x, transformedPoint.y)
            ctx.scale(scale, scale)
            ctx.translate(-transformedPoint.x, -transformedPoint.y)

            if (this.zoomTick === 100) {
                this.zoomTick = 0
                this.startLevel = false
            }
        }

        // Translate to the transformed point, scale, and then translate back

        // Draw the circle
        ctx.arc(circleCenter.x, circleCenter.y, this.rect.width / 2, 0, 2 * Math.PI, false)

        if (this.hover) {
            ctx.strokeStyle = "white"
            ctx.lineWidth = 2
            ctx.stroke()
        }

        ctx.fillStyle = "red"
        ctx.fill()

        ctx.restore() // Restore the previous context state
        ctx.closePath()
    }
}

export class PauseButton extends Button {
    constructor(action, x, y, width, height, text) {
        super(action, x, y, width, height)

        this.text = text
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fillStyle = this.hover ? "rgba(100,100,100,0.4)" : "rgba(0,0,0,0)"

        ctx.fillRect(this.rect.position.x, this.rect.position.y, this.rect.width, this.rect.height)

        ctx.fillStyle = "white"
        ctx.font = "500 18px Montserrat"
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
