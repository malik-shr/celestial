export default class Sprite {
    constructor(src, width, height, cropWidth, cropHeight, buffer = 1) {
        this.loaded = false

        this.img = new Image()
        this.img.onload = () => {
            this.loaded = true
        }
        this.img.src = src

        this.width = width
        this.height = height

        this.cropWidth = cropWidth
        this.cropHeight = cropHeight
        this.buffer = buffer
        this.currentFrame = 8
    }

    draw(ctx, col = 0, row = 0, position) {
        if (!this.loaded) return

        ctx.drawImage(
            this.img,
            col * this.cropWidth,
            row * this.cropHeight,
            this.cropWidth,
            this.cropHeight,
            position.x,
            position.y,
            this.width,
            this.height
        )
    }
}
