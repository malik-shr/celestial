export default class Sprite {
    constructor(src, cropWidth, cropHeight) {
        this.loaded = false

        this.img = new Image()
        this.img.onload = () => {
            this.loaded = true
        }
        this.img.src = src

        this.cropWidth = cropWidth
        this.cropHeight = cropHeight
    }

    draw(ctx, currentFrame, position, width, height) {
        if (!this.loaded) return

        ctx.drawImage(
            this.img,
            currentFrame * this.cropWidth,
            0,
            this.cropWidth,
            this.cropHeight,
            position.x,
            position.y,
            width,
            height
        )
    }
}
