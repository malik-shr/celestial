import { keysPressed } from "../listener/store"

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
            this.player.cameraBox.position.x - Math.round(this.player.velocity.x / 10) + this.player.cameraBox.width

        // wird nur ausgeführt falls player velocity negativ
        if (previousCameraBoxRightSide >= this.canvas.width + Math.abs(this.position.x) && this.player.velocity.x > 0) {
            this.position.x -= Math.round(this.player.velocity.x / 10)
        }
    }

    shouldPanCameraToTheRight() {
        const previousCameraBoxLeftSide = this.player.cameraBox.position.x - Math.round(this.player.velocity.x / 10)
        
        if (previousCameraBoxLeftSide <= 0) return

        // wird nur ausgeführt falls player velocity positiv
        if (previousCameraBoxLeftSide <= Math.abs(this.position.x)  && this.player.velocity.x < 0) {
            this.position.x -= Math.round(this.player.velocity.x / 10)
        }
    }

    pan(){
        this.shouldPanCameraToTheLeft()
        this.shouldPanCameraToTheRight()
    }
}