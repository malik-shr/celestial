import { keysPressed } from "../listener/store"

class position {
    x
    y

    constructor(x,y){
        this.x = x
        this.y = y
    }
}

export default class Camera {
    position
    canvas
    player

    constructor(x, y, canvas, player) {
        this.position = new position(x,y)
        this.canvas = canvas
        this.player = player
    }

    shouldPanCameraToTheLeft() {
        const cameraBoxRightSide =
            this.player.cameraBox.position.x + this.player.cameraBox.width

        if (cameraBoxRightSide >= this.canvas.width + Math.abs(this.position.x)) {
            this.position.x -= Math.round(this.player.velocity.x / 10)
        }
    }

    shouldPanCameraToTheRight() {
        if (this.player.cameraBox.position.x <= 0) return

        if (this.player.cameraBox.position.x <= Math.abs(this.position.x)) {
            this.position.x -= Math.round(this.player.velocity.x / 10)
        }
    }

    pan(){
        if(keysPressed.get("ArrowRight")){
        this.shouldPanCameraToTheLeft()
        }
        if(keysPressed.get("ArrowLeft")){
        this.shouldPanCameraToTheRight()
        }
    }
}