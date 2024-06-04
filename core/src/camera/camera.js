export default class Camera {
    constructor(x, y, canvas, player) {
        this.position = {
            x: x,
            y: y,
        }
        this.canvas = canvas
        this.player = player

        this.bgLayer = {
            position: {
                x: 0,
                y: 0,
            },
        }

        this.previous = null

        this.relativeRightBound = (this.canvas.width / 2) * 0.5
        this.relativeLeftBound = (this.canvas.width / 2) * 0.2
        this.relativeVerticalBound = (this.canvas.height / 2) * 0.4

        this.shakerTick = 0
        this.shaking = false

        this.intensity = { x: 0, y: 0 }
    }

    shouldPanCameraToTheLeft() {
        const rightBound = this.relativeRightBound + Math.abs(this.position.x) - this.player.width

        if (this.player.position.x >= rightBound && this.player.velocity.x > 0) {
            this.position.x -= this.player.velocity.x
            this.bgLayer.position.x -= (99 / 100) * this.player.velocity.x
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
            this.bgLayer.position.x -= (99 / 100) * this.player.velocity.x
        }
    }

    shouldPanCameraDown() {
        const verticalBound = this.relativeVerticalBound - Math.abs(this.position.y)

        if (this.player.position.y <= verticalBound && this.player.velocity.y < 0) {
            this.position.y -= this.player.velocity.y
            this.bgLayer.position.y -= (99 / 100) * this.player.velocity.y
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
            this.bgLayer.position.y -= (99 / 100) * this.player.velocity.y
        }
    }

    checkShaking() {
        if (!this.shaking) return

        ++this.shakerTick

        // Calculate the current shake amplitude using a decaying sine wave
        const progress = this.shakerTick / 20
        const intensity = 4 * (1 - progress)
        let xOffset = (Math.random() * 2 - 1) * this.intensity.x
        let yOffset = (Math.random() * 2 - 1) * this.intensity.y

        while (this.position.y + yOffset < 0) {
            yOffset = (Math.random() * 2 - 1) * this.intensity.y
        }

        while (this.position.x + xOffset > 0) {
            xOffset = (Math.random() * 2 - 1) * this.intensity.x
        }

        this.position.x += xOffset
        this.position.y += yOffset

        this.bgLayer.position.x += xOffset
        this.bgLayer.position.y += yOffset

        if (this.shakerTick >= 20) {
            this.shaking = false
            this.shakerTick = 0
        }
    }

    shake(intensityX, intensityY) {
        this.shaking = true

        this.intensity.x = intensityX
        this.intensity.y = intensityY
    }

    pan() {
        this.shouldPanCameraToTheLeft()
        this.shouldPanCameraToTheRight()
        this.shouldPanCameraDown()
        this.shouldPanCameraUp()
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

    save() {
        this.previous = this.clone()
    }

    load() {
        if (this.previous === null) {
            this.position = {
                x: 0,
                y: 0,
            }
            this.bgLayer.position = {
                x: 0,
                y: 0,
            }

            return
        }

        this.position = structuredClone(this.previous.position)
        this.bgLayer.position = structuredClone(this.previous.bgLayer.position)
    }

    /** @returns camera state at the time of function call */
    clone() {
        return {
            position: structuredClone(this.position),
            bgLayer: structuredClone(this.bgLayer),
        }
    }
}
