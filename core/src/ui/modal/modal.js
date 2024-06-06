import ButtonList from "../buttonList"

export default class Modal {
    constructor(title, width, height, game, canvas) {
        this.game = game
        this.canvas = canvas

        this.title = title

        this.scale = 0

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = false

        this.isActive = false

        this.width = width
        this.height = height

        this.box = {
            position: {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height / 2 - this.height / 2,
            },
        }
    }

    open() {
        this.isActive = true
        this.buttonList.isActive = true
    }

    close() {
        this.isActive = false
        this.buttonList.isActive = false
    }

    updateFrames(speed = 16) {
        if (this.isActive && this.scale < 1) {
            this.scale += 1 / speed
        }

        if (!this.isActive && this.scale > 0) {
            this.scale -= 1 / speed

            // Rounding Point
            if (this.scale < 0) {
                this.scale = 0
            }
        }
    }

    drawTitle(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "800 28px Montserrat"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        ctx.fillText(this.title, this.box.position.x + this.width / 2, this.box.position.y + 40)
    }

    scaleBox(ctx) {
        ctx.scale(this.scale, this.scale)
        ctx.setTransform(
            this.scale,
            0,
            0,
            this.scale,
            (-(this.scale - 1) * this.canvas.width) / 2,
            (-(this.scale - 1) * this.canvas.height) / 2
        )
    }

    drawBox(ctx) {
        ctx.fillStyle = "#487394"
        ctx.roundRect(this.box.position.x, this.box.position.y, this.width, this.height, [15])
        ctx.fill()
    }
}
