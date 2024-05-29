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

        this.action = action
    }

    onHover() {}
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
    constructor(action, x, y, text) {
        super(action, x, y, text)
    }

    draw(ctx) {
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

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
