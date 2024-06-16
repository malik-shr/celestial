import Element from "./element"

export default class Goal extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game
        this.isActive = false
    }

    handleCollisionX(player) {
        this.handleCollision()
    }

    handleCollisionY(player) {
        this.handleCollision()
    }

    handleCollision() {
        if (this.isActive) return

        this.isActive = true

        this.game.completed.open()
        this.game.level.completed = true
        this.game.level.write()
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "blue"
        ctx.fill()
        ctx.closePath()
    }
}
