import Element from "./element"
import Sprite from "./sprite"

export default class Goal extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game
        this.isActive = false

        this.sprite = new Sprite("rocket.png", 32, 96, 32, 96)
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
        this.sprite.draw(ctx, this.currentFrame, 0, this.position)
    }
}
