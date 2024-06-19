import Element from "./element"

export default class Tuturial extends Element {
    constructor(x, y, text, game) {
        super(x, y)

        this.game = game
        this.text = text

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

        if (this.game.level.tuturialIndex < this.game.level.tuturials.length - 1) {
            this.game.level.tuturials[++this.game.level.tuturialIndex].isActive = true
        }
    }

    draw(ctx) {
        if (!this.isActive) return

        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.font = "16px Montserrat"
        ctx.textAlign = "center"

        ctx.fillText(this.text, this.position.x, this.position.y)

        ctx.closePath()
    }
}
