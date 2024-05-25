export default class Button {
    constructor(action, x, y, width, height, text) {
        this.rect = {
            position: {
                x: x,
                y: y,
            },
            width: width,
            height: height,
        }

        this.action = action

        this.text = text
    }

    onHover() {}
}

export class MenuButton extends Button {
    constructor(action, x, y, text) {
        super(action, x, y, text)
    }
}

export class LevelButton extends Button {
    constructor(action, x, y, text) {
        super(action, x, y, text)
    }

    draw(ctx) {
        ctx.font = "26px serif"
        ctx.textAlign = "center"
        ctx.fillStyle = "white"

        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        ctx.closePath()
    }
}

export class PauseButton extends Button {
    constructor(action, x, y, width, height, text) {
        super(action, x, y, width, height, text)
    }

    draw(ctx) {
        ctx.fillStyle = this.hover ? "gray" : "white"

        ctx.fillRect(this.rect.position.x, this.rect.position.y, this.rect.width, this.rect.height)

        ctx.fillStyle = "black"
        ctx.font = "18px sans-serif"
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
