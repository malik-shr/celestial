import { getLevels } from "../../level/levelList"
import { Screen, currentScreen } from "../../listener/store"
import { MenuButton } from "../button"
import Modal from "./modal"

export default class Pause extends Modal {
    constructor(game, canvas) {
        super("Pause", 250, 320, game, canvas)

        this.resumeGame = this.resumeGame.bind(this)
        this.retry = this.retry.bind(this)
        this.exitGame = this.exitGame.bind(this)

        this.openTime = 0
        this.time = 0
        this.closeTime = 0

        const positionY = this.box.position.y + this.height / 2 - 80
        const marginX = 45

        const resumeBtn = new MenuButton(
            this.resumeGame,
            this.box.position.x + marginX / 2,
            positionY,
            this.width - marginX,
            50,
            "Resume"
        )

        const retryBtn = new MenuButton(
            this.retry,
            this.box.position.x + marginX / 2,
            positionY + 70,
            this.width - marginX,
            50,
            "Retry"
        )

        const exitBtn = new MenuButton(
            this.exitGame,
            this.box.position.x + marginX / 2,
            positionY + 160,
            this.width - marginX,
            50,
            "Exit Game"
        )

        this.buttonList.add(resumeBtn)
        this.buttonList.add(retryBtn)
        this.buttonList.add(exitBtn)
    }

    resumeGame() {
        this.close()
    }

    retry() {
        this.close()

        const levels = getLevels(this.game)

        this.game.startLevel(levels[this.game.level.name])
    }

    exitGame() {
        this.close()
        this.game.menu.open()
    }

    open() {
        super.open()

        this.startTime = performance.now()
        this.alreadyOpened = true
        this.openTime = performance.now()
    }

    close() {
        super.close()

        this.time += performance.now() - this.startTime
        this.closeTime = performance.now()
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

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
