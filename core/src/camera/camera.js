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
            this.player.camerabox.position.x + this.player.camerabox.width - this.player.velocity.x

        // wird nur ausgeführt falls player velocity negativ
        if (
            previousCameraBoxRightSide >= this.canvas.width + Math.abs(this.position.x) &&
            this.player.velocity.x > 0
        ) {
            this.position.x -= this.player.velocity.x
        }
    }

    shouldPanCameraToTheRight() {
        const previousCameraBoxLeftSide = this.player.camerabox.position.x - this.player.velocity.x

        if (this.player.camerabox.position.x <= 0) return

        // wird nur ausgeführt falls player velocity positiv
        if (previousCameraBoxLeftSide <= Math.abs(this.position.x) && this.player.velocity.x < 0) {
            this.position.x -= this.player.velocity.x
        }
    }

    shouldPanCameraDown() {
        const previousCameraUp = this.player.camerabox.position.y - this.player.velocity.y

        // wird nur ausgeführt falls player velocity positiv
        if (previousCameraUp <= -Math.abs(this.position.y) && this.player.velocity.y < 0) {
            this.position.y -= this.player.velocity.y
        }
    }

    shouldPanCameraUp() {
        const previousCameraDown =
            this.player.camerabox.position.y + this.player.camerabox.height - this.player.velocity.y

        if (this.position.y - this.player.velocity.y <= 0) {
            this.position.y = 0
            return
        }

        if (
            previousCameraDown >= this.canvas.height + -Math.abs(this.position.y) &&
            this.player.velocity.y > 0
        ) {
            // wird nur ausgeführt falls player velocity negativ
            this.position.y -= this.player.velocity.y
        }
    }

    pan() {
        this.shouldPanCameraToTheLeft()
        this.shouldPanCameraToTheRight()
        this.shouldPanCameraDown()
        this.shouldPanCameraUp()
    }
}
