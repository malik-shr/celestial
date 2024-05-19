export default class Camera {
    constructor(x, y, canvas, player) {
        this.position = {
            x: x,
            y: y,
        }
        this.canvas = canvas
        this.player = player
    }

    shouldPanCameraToTheLeft() {
        // wird nur ausgeführt falls player velocity negativ
        if (
            this.player.position.x >= this.canvas.width * 0.4 + Math.abs(this.position.x) &&
            this.player.velocity.x > 0
        ) {
            this.position.x -= this.player.velocity.x
        }
    }

    shouldPanCameraToTheRight() {
        // wird nur ausgeführt falls player velocity positiv
        console.log(this.canvas.width * 0.1 + Math.abs(this.position.x))
        if (
            this.player.position.x <= this.canvas.width * 0.1 + Math.abs(this.position.x) &&
            this.player.velocity.x < 0
        ) {
            if (this.position.x - this.player.velocity.x >= 0) {
                this.position.x = 0
                return
            }
            this.position.x -= this.player.velocity.x
        }
    }

    shouldPanCameraDown() {
        if (
            this.player.position.y <= this.canvas.height * 0.4 - Math.abs(this.position.y) &&
            this.player.velocity.y < 0
        ) {
            this.position.y -= this.player.velocity.y
        }
    }

    shouldPanCameraUp() {
        if (
            this.player.position.y >= this.canvas.height * 0.4 - Math.abs(this.position.y) &&
            this.player.velocity.y > 0
        ) {
            if (this.position.y - this.player.velocity.y <= 0) {
                this.position.y = 0
                return
            }
            this.position.y -= this.player.velocity.y
        }
    }

    pan() {
        this.shouldPanCameraToTheLeft()
        this.shouldPanCameraToTheRight()
        this.shouldPanCameraDown()
        this.shouldPanCameraUp()
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fillStyle = "yellow"

        ctx.fillRect(this.canvas.width * 0.4, 0, 1, this.canvas.height)
        ctx.fillRect(this.canvas.width * 0.1, 0, 1, this.canvas.height)

        ctx.fillRect(0, this.canvas.height * 0.4, this.canvas.width, 1)

        ctx.closePath()
    }
}
