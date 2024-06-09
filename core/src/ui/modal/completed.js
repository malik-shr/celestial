import { MenuButton } from "../button"
import Modal from "./modal"

export default class Completed extends Modal {
    constructor(game, canvas) {
        super("Completed", 300, 310, game, canvas)
        this.game = game
        this.canvas = canvas

        this.back = this.back.bind(this)

        const marginX = 60
        const contentBottom = this.box.position.y + this.height - 50 - 25

        const nextBtn = new MenuButton(
            this.back,
            this.box.position.x + this.width / 2 - (this.width - marginX) / 2,
            contentBottom,
            this.width - marginX,
            50,
            "Next"
        )

        this.buttonList.add(nextBtn)
    }

    back() {
        super.close()
        this.game.menu.open()
    }

    draw(ctx) {
        super.updateFrames()

        ctx.beginPath()
        ctx.save()

        ctx.fillStyle = `rgba(0,0,0,${this.scale * 0.5})`
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        super.scaleBox(ctx)
        super.drawBox(ctx)
        super.drawTitle(ctx)

        const oldBestTime =
            this.game.level.meta.data.best === Number.MAX_SAFE_INTEGER
                ? this.game.time
                : this.game.level.meta.data.best

        const newTimeIsBetter =
            parseFloat(this.game.time) < parseFloat(this.game.level.meta.data.best)

        let newBestTime = newTimeIsBetter ? this.game.time : oldBestTime
        let time = this.game.time

        if (newBestTime > 99999999) {
            newBestTime = 99999999
        }

        if (time > 99999999) {
            time = 99999999
        }

        ctx.font = "500 24px Montserrat"
        ctx.textAlign = "left"
        ctx.fillText(
            `💀 ${this.game.player.deaths}`,
            this.box.position.x + 30,
            this.box.position.y + 100
        )

        ctx.fillStyle = newTimeIsBetter ? "#C3FF93" : "white"

        ctx.fillText(`🕒 ${time}s`, this.box.position.x + 30, this.box.position.y + 150)

        ctx.fillText(`🏆 ${newBestTime}s`, this.box.position.x + 30, this.box.position.y + 200)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
