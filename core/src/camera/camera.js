export default class Camera {
    constructor(x, y, canvas, player) {
        this.position = {
            x: x,
            y: y,
        }
        this.canvas = canvas
        this.player = player

        this.bgLayerpos = {
            x: 0,
            y: 0,
        }

        this.relativeRightBound = (this.canvas.width / 2) * 0.5
        this.relativeLeftBound = (this.canvas.width / 2) * 0.2
        this.relativeVerticalBound = (this.canvas.height / 2) * 0.4

        this.shakerTick = 0
        this.shaking = false
    }

    shouldPanCameraToTheLeft(considerMoving) {
        const rightBound = this.relativeRightBound + Math.abs(this.position.x) - this.player.width
        const shouldPan = considerMoving ? this.player.velocity.x > 0 : true

        if (this.player.position.x >= rightBound && shouldPan) {
            this.position.x -= this.player.velocity.x
            this.bgLayerpos.x -= (99 / 100) * this.player.velocity.x
        }
    }

    shouldPanCameraToTheRight(considerMoving) {
        const leftBound = this.relativeLeftBound + Math.abs(this.position.x)
        const shouldPan = considerMoving ? this.player.velocity.x < 0 : true

        if (this.player.position.x <= leftBound && shouldPan) {
            if (this.position.x - this.player.velocity.x >= 0) {
                this.position.x = 0
                return
            }
            this.position.x -= this.player.velocity.x
            this.bgLayerpos.x -= (99 / 100) * this.player.velocity.x
        }
    }

    shouldPanCameraDown(considerMoving) {
        const verticalBound = this.relativeVerticalBound - Math.abs(this.position.y)
        const shouldPan = considerMoving ? this.player.velocity.y < 0 : true

        if (this.player.position.y <= verticalBound && shouldPan) {
            this.position.y -= this.player.velocity.y
        }
    }

    shouldPanCameraUp(considerMoving) {
        const verticalBound = this.relativeVerticalBound - Math.abs(this.position.y)
        const shouldPan = considerMoving ? this.player.velocity.y > 0 : true

        if (this.player.position.y >= verticalBound && shouldPan) {
            if (this.position.y - this.player.velocity.y <= 0) {
                this.position.y = 0
                return
            }
            this.position.y -= this.player.velocity.y
        }
    }

    shakeCamera() {
        if (!this.shaking) return

        ++this.shakerTick

        // Calculate the current shake amplitude using a decaying sine wave
        const progress = this.shakerTick / 20
        const intensity = 4 * (1 - progress)
        let xOffset = (Math.random() * 2 - 1) * intensity
        let yOffset = (Math.random() * 2 - 1) * intensity

        while (this.position.y + yOffset < 0) {
            yOffset = (Math.random() * 2 - 1) * intensity
        }

        while (this.position.x + xOffset > 0) {
            xOffset = (Math.random() * 2 - 1) * intensity
        }

        this.position.x += xOffset
        this.position.y += yOffset

        if (this.shakerTick >= 20) {
            this.shaking = false
            this.shakerTick = 0
            this.pan(false) // Stop panning if any
        }
    }
    pan(considerMoving = true) {
        if (this.shaking) return

        this.shouldPanCameraToTheLeft(considerMoving)
        this.shouldPanCameraToTheRight(considerMoving)
        this.shouldPanCameraDown(considerMoving)
        this.shouldPanCameraUp(considerMoving)
    }

    draw(ctx) {
        ctx.beginPath()

        ctx.fillStyle = "rgba(255,255,0,0.3)"

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
