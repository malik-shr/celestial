import { wrapText } from "../utils"
import Element from "./element"

export default class Tutorial extends Element {
    constructor(x, y, text, index, game) {
        super(x, y)

        this.game = game
        this.text = text
        this.index = index

        this.isActive = false
        this.collided = false
    }

    handleCollisionY(player) {
        this.handleCollision()
    }

    handleCollisionX(player) {
        this.handleCollision()
    }

    handleCollision() {
        if (this.collided || !this.isActive) return

        this.collided = true
        this.isActive = false

        if (this.game.level.tutorialIndex < this.game.level.tutorials.length - 1) {
            this.game.level.tutorials[++this.game.level.tutorialIndex].isActive = true
        }
    }

    draw(ctx) {
        if (!this.isActive) return

        ctx.beginPath()

        ctx.fillStyle = "#e9d700"
        ctx.font = "600 11px Montserrat"
        ctx.textAlign = "center"

        wrapText(
            ctx,
            this.text,
            Math.abs(this.game.camera.position.x) + this.game.canvas.width / 4,
            50 - Math.abs(this.game.camera.position.y),
            300,
            15
        )

        ctx.fillStyle = "#e9d700"
        ctx.font = "72px Montserrat"
        ctx.textAlign = "center"

        ctx.fillText("↓", this.position.x, this.position.y)

        ctx.closePath()
    }
}
