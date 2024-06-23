import Element from "./element"
import Particles from "./particle"
import Sprite from "./sprite"

export default class Goal extends Element {
    constructor(x, y, game) {
        super(x, y, 32, 96)

        this.game = game
        this.isActive = false
        this.counter = 0

        this.sprite = new Sprite("rocket.png", 32, 96, 32, 96)
    }

    handle() {
        if (!this.isActive) return

        if (Math.floor(this.counter / 25) % 2 === 0) {
            this.game.player.currentSprite = this.game.player.sprites.jump.right
        } else {
            this.game.player.currentSprite = this.game.player.sprites.jump.left
        }

        if (this.counter === 10) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x,
                    this.position.y - 50,
                    ["#ff0000", "#ff5252", "#ff7b7b"],
                    1
                )
            )
        }

        if (this.counter === 25) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x - 50,
                    this.position.y - 50,
                    ["#03396c", "#005b96", "#6497b1"],
                    1
                )
            )
        }

        if (this.counter === 40) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x + 70,
                    this.position.y,
                    ["#059212", "#06D001", "#9BEC00"],
                    1
                )
            )
        }

        if (this.counter === 55) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x + 80,
                    this.position.y - 60,
                    ["#ff0000", "#ff5252", "#ff7b7b"],
                    1
                )
            )
        }

        if (this.counter === 70) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x - 80,
                    this.position.y - 80,
                    ["#03396c", "#005b96", "#6497b1"],
                    1
                )
            )
        }

        if (this.counter === 85) {
            this.game.level.elementList.add(
                new Particles(
                    this.position.x + 50,
                    this.position.y - 100,
                    ["#059212", "#06D001", "#9BEC00"],
                    1
                )
            )
        }

        if (this.counter >= 95) {
            this.game.level.completed = true
            this.game.completed.open()
            this.game.level.write()
        }

        this.game.player.position.x = this.position.x
        this.game.player.position.y = this.position.y + this.height - this.game.player.height

        this.game.player.canDash = true

        this.counter += 1
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
        player.shouldDraw = false
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.currentFrame, 0, this.position)
    }
}
