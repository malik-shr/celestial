import { MenuButton } from "../button"
import Modal from "./modal"

export default class Completed extends Modal {
    constructor(game, canvas) {
        super("Completed", 300, 300, game, canvas)
        this.game = game
        this.canvas = canvas

        this.back = this.back.bind(this)

        const marginX = 60

        const nextBtn = new MenuButton(
            this.back,
            this.box.position.x + this.width / 2 - (this.width - marginX) / 2,
            this.box.position.y + this.height - 50 - 20,
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

        ctx.font = "500 24px Montserrat"
        ctx.fillText(
            `💀 ${this.game.player.deaths}`,
            this.box.position.x + this.width / 2,
            this.box.position.y + 110
        )

        ctx.fillText(
            `🕒 ${(this.game.time / 1000).toFixed(1)}s`,
            this.box.position.x + this.width / 2,
            this.box.position.y + 160
        )

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
