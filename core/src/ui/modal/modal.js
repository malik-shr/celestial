import ButtonList from "../buttonList"

export default class Modal {
    constructor(x, y, width, height, game, canvas) {
        this.game = game

        this.canvas = canvas

        this.scale = 0

        this.buttonList = new ButtonList(canvas)
        this.buttonList.isActive = false

        this.isActive = false

        this.width = width
        this.height = height

        this.box = {
            position: {
                x: x,
                y: y,
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

    updateFrames() {
        if (this.isActive && this.scale < 1) {
            this.scale += 1 / 20
        }

        if (!this.isActive && this.scale > 0) {
            this.scale -= 1 / 20

            // Rounding Point
            if (this.scale < 0) {
                this.scale = 0
            }
        }
    }
}
