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

        ctx.fillStyle = "rgba(0,0,0,0.4)"
        ctx.roundRect(
            Math.abs(this.game.camera.position.x) + this.game.canvas.width / 4 - 350 / 2,
            30 - Math.abs(this.game.camera.position.y),
            350,
            40,
            [12]
        )
        ctx.fill()

        ctx.beginPath()

        ctx.fillStyle = "#FFF455"
        ctx.font = "500 10px Montserrat"
        ctx.textAlign = "left"

        wrapText(
            ctx,
            this.text,
            Math.abs(this.game.camera.position.x) + this.game.canvas.width / 4 - 350 / 2 + 8,
            40 - Math.abs(this.game.camera.position.y),
            350,
            15
        )

        ctx.fillStyle = "#FFF455"
        ctx.font = "72px Montserrat"
        ctx.textAlign = "center"

        ctx.fillText("↓", this.position.x, this.position.y)

        ctx.closePath()
    }
}
