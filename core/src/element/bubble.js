import Particles from "./particle"
import Element from "./element"
import Sprite from "./sprite"

export default class Bubble extends Element {
    constructor(x, y, game) {
        super(x, y)

        this.game = game

        this.collided = false
        this.cooldown = 0

        this.sprite = new Sprite("bubble.png", 32, 32, 64, 64)
    }

    action() {
        if (!this.collided) return

        if (this.collided) {
            ++this.cooldown
        }

        if (this.cooldown === 1) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x,
                    this.position.y,
                    ["#f3ffff", "#beeaff", "#beeaff", "#beeaff"],
                    0
                )
            )
        }

        if (this.cooldown === 70) {
            this.cooldown = 0
            this.collided = false
        }
    }

    handleCollisionY(player) {
        this.handleCollision(player)
    }

    handleCollisionX(player) {
        this.handleCollision(player)
    }

    handleCollision(player) {
        if (!this.collided) {
            this.collided = true
            player.canDash = true
        }
    }

    draw(ctx) {
        if (this.collided) return

        this.sprite.draw(ctx, 0, 0, this.position)
    }
}
