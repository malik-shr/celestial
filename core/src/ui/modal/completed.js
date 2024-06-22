import LevelMeta from "../../level/LevelMeta"
import { getGodModeMeta, toTime } from "../../utils"
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
        super.drawDimmed(ctx)
        super.updateFrames()

        const meta = this.game.levelList.get(this.game.level.name)

        ctx.beginPath()
        ctx.save()

        super.scaleBox(ctx)
        super.drawBox(ctx)
        super.drawTitle(ctx)

        const oldBestTime =
            meta.data.best === Number.MAX_SAFE_INTEGER ? this.game.time : meta.data.best

        const newTimeIsBetter = parseFloat(this.game.time) <= parseFloat(meta.data.best)

        const newBestTime = newTimeIsBetter ? this.game.time : oldBestTime
        const time = this.game.time

        ctx.font = "500 24px Montserrat"
        ctx.textAlign = "left"
        ctx.fillText(
            `💀 ${this.game.player.deaths}`,
            this.box.position.x + 30,
            this.box.position.y + 100
        )

        ctx.fillStyle = newTimeIsBetter ? "#C3FF93" : "#e3e3d2"

        ctx.fillText(
            `🕒 ${toTime(parseFloat(time))}`,
            this.box.position.x + 30,
            this.box.position.y + 150
        )

        ctx.fillText(
            `🏆 ${toTime(parseFloat(newBestTime))}`,
            this.box.position.x + 30,
            this.box.position.y + 200
        )

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
