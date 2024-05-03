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
    player

    constructor(x, y, canvas, player) {
        this.position = new position(x,y)
        this.canvas = canvas
        this.player = player
    }

    shouldPanCameraToTheLeft(canvas, player) {
        const cameraBoxRightSide =
            player.cameraBox.position.x + player.cameraBox.width

        if (cameraBoxRightSide >= canvas.width + Math.abs(this.position.x)) {
            this.position.x -= Math.round(player.velocity.x / 10)
        }
    }

    shouldPanCameraToTheRight(canvas, player) {
        if (player.cameraBox.position.x <= 0) return

        if (player.cameraBox.position.x <= Math.abs(this.position.x)) {
            this.position.x -= Math.round(player.velocity.x / 10)
        }
    }

    pan(){
        this.shouldPanCameraToTheLeft(this.canvas, this.player)
        this.shouldPanCameraToTheRight(this.canvas, this.player)
    }
}