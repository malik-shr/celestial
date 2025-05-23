import { MenuButton } from "../button"
import Modal from "./modal"

export default class Pause extends Modal {
    constructor(levelList, game, canvas) {
        super("Pause", 300, 370, game, canvas)

        this.levelList = levelList

        this.resumeGame = this.resumeGame.bind(this)
        this.retry = this.retry.bind(this)

        this.restart = this.restart.bind(this)
        this.exitGame = this.exitGame.bind(this)

        this.openTime = 0
        this.time = 0
        this.closeTime = 0

        const marginX = 60

        const contentBottom = this.box.position.y + this.height - 50 - 25

        const resumeBtn = new MenuButton(
            this.resumeGame,
            this.box.position.x + marginX / 2,
            contentBottom - 210,
            this.width - marginX,
            50,
            "Resume"
        )

        const retryBtn = new MenuButton(
            this.retry,
            this.box.position.x + marginX / 2,
            contentBottom - 140,
            this.width - marginX,
            50,
            "Retry"
        )

        const restartBtn = new MenuButton(
            this.restart,
            this.box.position.x + marginX / 2,
            contentBottom - 70,
            this.width - marginX,
            50,
            "Restart Level"
        )

        const exitBtn = new MenuButton(
            this.exitGame,
            this.box.position.x + marginX / 2,
            contentBottom,
            this.width - marginX,
            50,
            "Exit Game"
        )

        this.buttonList.add(resumeBtn)
        this.buttonList.add(retryBtn)
        this.buttonList.add(restartBtn)
        this.buttonList.add(exitBtn)
    }

    resumeGame() {
        this.close()
    }

    retry() {
        this.close()

        this.game.startLevel(this.levelList.get(this.game.level.name))
    }

    restart() {
        this.close()

        const savedItem = localStorage.getItem(this.game.level.name)

        if (savedItem) {
            const storage = JSON.parse(savedItem)

            const newData = {
                respawnPoint: {
                    x: Number.MAX_SAFE_INTEGER,
                    y: Number.MAX_SAFE_INTEGER,
                },
                camera: {
                    x: Number.MAX_SAFE_INTEGER,
                    y: Number.MAX_SAFE_INTEGER,
                },
                bgLayer: {
                    x: Number.MAX_SAFE_INTEGER,
                    y: Number.MAX_SAFE_INTEGER,
                },
                time: 0,
                deaths: 0,
                tutorialIndex: 0,
                best: storage.best,
            }

            localStorage.setItem(this.game.level.name, JSON.stringify(newData))
        }

        this.game.startLevel(this.levelList.get(this.game.level.name))
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
        super.drawDimmed(ctx)
        super.updateFrames()

        ctx.beginPath()
        ctx.save()

        super.scaleBox(ctx)
        super.drawBox(ctx)
        super.drawTitle(ctx)

        this.buttonList.draw(ctx)

        ctx.restore()
        ctx.closePath()
    }
}
