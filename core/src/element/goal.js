import Element from "./element"

export default class Goal extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game
    }

    handleCollisionX(player) {
        this.game.completed.open()
    }

    handleCollisionY(player) {
        this.game.completed.open()
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "blue"
        ctx.fill()
        ctx.closePath()
    }
}
