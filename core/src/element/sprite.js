export default class Sprite {
    constructor(src, width, height, cropWidth, cropHeight) {
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
    }

    draw(ctx, currentFrame, position) {
        if (!this.loaded) return

        ctx.drawImage(
            this.img,
            currentFrame * this.cropWidth,
            0,
            this.cropWidth,
            this.cropHeight,
            position.x,
            position.y,
            this.width,
            this.height
        )
    }
}
