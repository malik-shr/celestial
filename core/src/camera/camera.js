export default class Camera {
    constructor(x, y, canvas, player) {
        this.position = {
            x: x,
            y: y,
        }
        this.canvas = canvas
        this.player = player

        this.relativeRightBound = this.canvas.width * 0.5
        this.relativeLeftBound = this.canvas.width * 0.2
        this.relativeVerticalBound = this.canvas.height * 0.4
    }

    shouldPanCameraToTheLeft() {
        const rightBound = this.relativeRightBound + Math.abs(this.position.x) - this.player.width

        if (this.player.position.x >= rightBound && this.player.velocity.x > 0) {
            this.position.x -= this.player.velocity.x
        }
    }

    shouldPanCameraToTheRight() {
        const leftBound = this.relativeLeftBound + Math.abs(this.position.x)

        if (this.player.position.x <= leftBound && this.player.velocity.x < 0) {
            if (this.position.x - this.player.velocity.x >= 0) {
                this.position.x = 0
                return
            }
            this.position.x -= this.player.velocity.x
        }
    }

    shouldPanCameraDown() {
        const verticalBound = this.relativeVerticalBound - Math.abs(this.position.y)

        if (this.player.position.y <= verticalBound && this.player.velocity.y < 0) {
            this.position.y -= this.player.velocity.y
        }
    }

    shouldPanCameraUp() {
        const verticalBound = this.relativeVerticalBound - Math.abs(this.position.y)

        if (this.player.position.y >= verticalBound && this.player.velocity.y > 0) {
            if (this.position.y - this.player.velocity.y <= 0) {
                this.position.y = 0
                return
            }
            this.position.y -= this.player.velocity.y
        }
    }

    action() {
        this.shouldPanCameraToTheLeft()
        this.shouldPanCameraToTheRight()
        this.shouldPanCameraDown()
        this.shouldPanCameraUp()
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fillStyle = "yellow"

        ctx.fillRect(
            this.relativeLeftBound + Math.abs(this.position.x),
            -Math.abs(this.position.y),
            1,
            this.canvas.height
        )
        ctx.fillRect(
            this.relativeRightBound + Math.abs(this.position.x),
            -Math.abs(this.position.y),
            1,
            this.canvas.height
        )

        ctx.fillRect(
            Math.abs(this.position.x),
            this.relativeVerticalBound - Math.abs(this.position.y),
            this.canvas.width,
            1
        )

        ctx.closePath()
    }
}
