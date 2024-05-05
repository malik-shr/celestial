export default class Camera {
    x
    y
    position
    canvas
    player

    constructor(x, y, canvas, player) {
        this.position = {
            x: x,
            y: y,
        }
        this.canvas = canvas
        this.player = player
    }

    shouldPanCameraToTheLeft() {
        const previousCameraBoxRightSide =
            this.player.cameraBox.position.x + this.player.cameraBox.width - this.player.velocity.x

        // wird nur ausgeführt falls player velocity negativ
        if (
            previousCameraBoxRightSide >= this.canvas.width + Math.abs(this.position.x) &&
            this.player.velocity.x > 0
        ) {
            this.position.x -= this.player.velocity.x
        }
    }

    shouldPanCameraToTheRight() {
        const previousCameraBoxLeftSide = this.player.cameraBox.position.x - this.player.velocity.x

        if (this.player.cameraBox.position.x <= 0) return

        // wird nur ausgeführt falls player velocity positiv
        if (previousCameraBoxLeftSide <= Math.abs(this.position.x) && this.player.velocity.x < 0) {
            this.position.x -= this.player.velocity.x
        }
    }

    pan() {
        this.shouldPanCameraToTheLeft()
        this.shouldPanCameraToTheRight()
    }
}
