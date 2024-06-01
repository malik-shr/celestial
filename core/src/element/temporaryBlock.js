import SolidBlock from "./solidBlock"
import Sprite from "./sprite"

export default class TemporaryBlock extends SolidBlock {
    constructor(x, y, relativeWidth = 1, relativeHeight = 1) {
        super(x, y, relativeWidth, relativeHeight)

        this.isActive = false
        this.removeBlock = false
        this.onBlockCounter = 0

        this.sprite = new Sprite("temporary_block.png", 32, 32, 32, 32)
    }

    action() {
        if (!this.isActive) return

        ++this.onBlockCounter

        if (this.onBlockCounter === 20) {
            this.removeBlock = true
        }

        if (this.onBlockCounter === 60) {
            this.onBlockCounter = 0
            this.isActive = false
            this.removeBlock = false
        }
    }

    handleCollisionY(player) {
        if (this.onBlockCounter < 20) {
            super.handleCollisionY(player)
        }

        if (
            player.previous.position.y - player.previous.velocity.y <=
            this.position.y - player.height
        ) {
            this.isActive = true
        }

        if (this.onBlockCounter > 20) {
            this.onBlockCounter = 20
        }
    }

    handleCollisionX(player) {
        if (this.onBlockCounter < 20) {
            super.handleCollisionX(player)
        }

        if (this.onBlockCounter > 20) {
            this.onBlockCounter = 20
        }
    }

    revertYCollision(player) {
        // do additional reversion logic
        this.activeFrames = 0
        this.isActive = false
    }

    draw(ctx) {
        if (this.removeBlock) return

        ctx.beginPath()
        ctx.rect(this.position.x, this.position.y, this.width, this.height)
        ctx.fillStyle = "red"
        ctx.fill()
        ctx.closePath()
    }
}
