import Element from "./element"
import Sprite from "./sprite"

export default class Goal extends Element {
    constructor(x, y, game) {
        super(x, y, 32, 96)

        this.game = game
        this.isActive = false
        this.counter = 0

        this.sprite = new Sprite("rocket.png", 32, 96, 32, 96)
    }

    action() {
        if (this.isActive) {
            this.counter += 1
        }

        if (this.isActive) {
            if (Math.floor(this.counter / 25) % 2 === 0) {
                this.game.player.currentSprite = this.game.player.sprites.jump.right
            } else {
                this.game.player.currentSprite = this.game.player.sprites.jump.left
            }
        }

        if (this.counter >= 95) {
            this.game.completed.open()
            this.game.level.completed = true
            this.game.level.write()
        }
    }

    handleCollisionX(player) {
        this.handleCollision(player)
    }

    handleCollisionY(player) {
        this.handleCollision(player)
    }

    handleCollision(player) {
        if (this.isActive) return

        this.isActive = true
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.currentFrame, 0, this.position)
    }
}
