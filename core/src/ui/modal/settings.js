import { MenuButton } from "../button"
import Modal from "./modal"

export default class Settings extends Modal {
    constructor(game, menu, canvas) {
        super("Settings", 300, 300, game, canvas)

        this.menu = menu

        this.close = this.close.bind(this)
        this.clearLocalStorage = this.clearLocalStorage.bind(this)

        const marginX = 60

        const clearButton = new MenuButton(
            this.clearLocalStorage,
            this.box.position.x + marginX / 2,
            this.box.position.y + this.height - 50 - 25 - 100,
            this.width - marginX,
            50,
            "Reset Progress",
            22,
            2
        )

        const closeButton = new MenuButton(
            this.close,
            this.box.position.x + this.width / 2 - 140 / 2,
            this.box.position.y + this.height - 50 - 25,
            140,
            50,
            "Close"
        )

        this.buttonList.add(clearButton)
        this.buttonList.add(closeButton)

        window.addEventListener("keyup", (event) => {
            if (event.key === "Escape") {
                if (!this.isActive) return

                this.close()
            }
        })
    }

    clearLocalStorage() {
        localStorage.clear()

        this.game.levelList.refresh()
        this.menu.updateButtonMeta()

        this.close()
    }

    draw(ctx) {
        super.updateFrames(10)

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
