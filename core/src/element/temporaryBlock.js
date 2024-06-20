import SolidBlock from "./solidBlock"
import Sprite from "./sprite"

export default class TemporaryBlock extends SolidBlock {
    constructor(x, y) {
        super(x, y)

        this.width = 32
        this.height = 16

        this.isActive = false
        this.removeBlock = false
        this.onBlockCounter = 0

        this.sprite = new Sprite("temporary_block.png", 32, 16, 32, 16)
    }

    action() {
        if (!this.isActive) return

        ++this.onBlockCounter

        if (this.onBlockCounter === 16) {
            this.removeBlock = true
        }

        if (this.onBlockCounter === 50) {
            this.onBlockCounter = 0
            this.isActive = false
            this.removeBlock = false
        }
    }

    handleCollisionY(player) {
        if (this.onBlockCounter < 16) {
            super.handleCollisionY(player)
        }

        if (
            player.previous.position.y - player.previous.velocity.y <=
            this.position.y - player.height
        ) {
            this.isActive = true
        }

        if (this.onBlockCounter > 16) {
            this.onBlockCounter = 16
        }
    }

    handleCollisionX(player) {
        if (this.onBlockCounter < 16) {
            super.handleCollisionX(player)
        }

        if (this.onBlockCounter > 16) {
            this.onBlockCounter = 16
        }
    }

    revertYCollision(player) {
        // do additional reversion logic
        this.activeFrames = 0
        this.isActive = false
    }

    draw(ctx) {
        if (this.removeBlock) return

        this.sprite.draw(ctx, 0, 0, this.position)
    }
}
